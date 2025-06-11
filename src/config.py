import os
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession

from src.application.use_cases import DataAnalysisUseCase
from src.infrastructure.repositories import (
    FileCustomerRepository,
    FileSalesRepository,
    PostgreSQLCustomerRepository,
    PostgreSQLSalesRepository,
)


class DIContainer:
    def __init__(self, db_session: Optional[AsyncSession] = None):
        self._setup_environment()
        self._db_session = db_session
        self._sales_repository = None
        self._customer_repository = None
        self._data_analysis_use_case = None

    def _setup_environment(self):
        pass

    @property
    def sales_repository(self):
        if self._sales_repository is None:
            if self._db_session is not None:
                # Use PostgreSQL repository if database session is available
                self._sales_repository = PostgreSQLSalesRepository(self._db_session)
            else:
                # Fallback to file repository
                self._sales_repository = FileSalesRepository()
        return self._sales_repository

    @property
    def customer_repository(self):
        if self._customer_repository is None:
            if self._db_session is not None:
                # Use PostgreSQL repository if database session is available
                self._customer_repository = PostgreSQLCustomerRepository(self._db_session)
            else:
                # Fallback to file repository
                self._customer_repository = FileCustomerRepository()
        return self._customer_repository

    @property
    def data_analysis_use_case(self):
        if self._data_analysis_use_case is None:
            self._data_analysis_use_case = DataAnalysisUseCase(
                self.sales_repository,
                self.customer_repository
            )
        return self._data_analysis_use_case