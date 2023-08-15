-- Drop the database if it already exists
DROP DATABASE IF EXISTS employees;

-- Create a new database
CREATE DATABASE employees;

-- Use the newly created database
USE employees;

-- Create a table to store department information
CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for departments
  name VARCHAR(30) UNIQUE NOT NULL  -- Name of the department (unique and required)
);

-- Create a table to store role information
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for roles
  title VARCHAR(30) UNIQUE NOT NULL,  -- Title of the role (unique and required)
  salary DECIMAL UNSIGNED NOT NULL,  -- Salary for the role (required)
  department_id INT UNSIGNED NOT NULL,  -- Department to which the role belongs (required)
  INDEX dep_ind (department_id),  -- Index on department_id for faster querying
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE  -- Foreign key to ensure department integrity
);

-- Create a table to store employee information
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for employees
  first_name VARCHAR(30) NOT NULL,  -- First name of the employee (required)
  last_name VARCHAR(30) NOT NULL,  -- Last name of the employee (required)
  role_id INT UNSIGNED NOT NULL,  -- Role of the employee (required)
  INDEX role_ind (role_id),  -- Index on role_id for faster querying
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,  -- Foreign key to ensure role integrity
  manager_id INT UNSIGNED,  -- Manager of the employee
  INDEX man_ind (manager_id),  -- Index on manager_id for faster querying
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL  -- Foreign key to ensure manager integrity (set to NULL on deletion)
);
