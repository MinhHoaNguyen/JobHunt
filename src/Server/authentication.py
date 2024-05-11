from datetime import datetime, timedelta, timezone
from jose import jwt
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=30)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, 'secret', algorithm='HS256')
    return encoded_jwt

class RequiredLogin(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(RequiredLogin, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        headers: HTTPAuthorizationCredentials = await super(RequiredLogin, self).__call__(request)
        if headers:
            if not headers.scheme == "Bearer":
                raise HTTPException(
                    status_code=403, detail="Invalid authentication scheme."
                )
            token = headers.credentials

            payload = self.verify_jwt(token)

            if payload is None:
                raise HTTPException(
                    status_code=403,
                    detail="Invalid token or expired token."
                )
            return payload.get("sub")
        else:
            raise HTTPException(
                status_code=403,
                detail="Invalid authorization code."
            )
        
    def verify_jwt(self, jwt_token: str):
        print(jwt_token)
        try:
            payload = jwt.decode(
                token=jwt_token,
                key='secret',
                algorithms=['HS256']
            )
            print(payload)
        except Exception as e:
            print(e)
            payload = None
        return payload
    
def get_current_user_id(token):
    try:
        payload = jwt.decode(token, 'secret', algorithms='HS256')
        return payload.get("sub")
    except jwt.JWTError:
        raise ValueError("Invalid token. Please provide a valid JWT token.")