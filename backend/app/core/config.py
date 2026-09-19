from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central app settings, read from environment variables / .env.
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql://user:password@host/dbname"
    redis_url: str = "redis://localhost:6379/0"
    cors_origins: str = "http://localhost:3000"
    jwt_secret: str = "changeme"
    paystack_secret_key: str = "sk_test_changeme"
    frontend_url: str = "http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
