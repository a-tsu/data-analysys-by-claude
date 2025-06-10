import os
from src.application.use_cases import DataAnalysisUseCase
from src.infrastructure.repositories import FileCustomerRepository, FileSalesRepository


class DIContainer:
    def __init__(self):
        self._setup_environment()
        self._sales_repository = None
        self._customer_repository = None
        self._data_analysis_use_case = None

    def _setup_environment(self):
        pass

    @property
    def sales_repository(self):
        if self._sales_repository is None:
            self._sales_repository = FileSalesRepository()
        return self._sales_repository

    @property
    def customer_repository(self):
        if self._customer_repository is None:
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