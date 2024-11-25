package com.employee.service;

import com.employee.entity.Employee;

import java.util.List;

public interface EmployeeService {

    List<Employee> fetchAllEmployees();

    Employee findById(int id);

    Employee createEmployee(Employee employee);

    Employee updateEmployee(Employee employee);

    String deleteEmployee(Long id);
}
