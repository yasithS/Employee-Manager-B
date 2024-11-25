package com.employee.service;

import com.employee.entity.Employee;
import com.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> fetchAllEmployees() {
        return(List<Employee>) employeeRepository.findAll();
    }

    @Override
    public Employee findById(int id) {
        return employeeRepository.findById((long) id).get();
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Employee employee) {

        Employee empObj = employeeRepository.findById(employee.getId()).get();
        if (empObj != null) {
            empObj.setEmail(employee.getEmail());
            empObj.setName(employee.getName());
            empObj.setSalary(employee.getSalary());
        }
        return employeeRepository.save(employee);
    }

    @Override
    public String deleteEmployee(Long id) {
        Employee empObj = employeeRepository.findById(id).get();
        String deleteMsg = "null";
        if (empObj != null) {
            employeeRepository.delete(empObj);
            deleteMsg = "employee deleted successfully for id "+id;
        }
        return deleteMsg;
    }


}
