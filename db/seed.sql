INSERT INTO department
    (name)
VALUES
    ('Sales Department'),
    ('Engineering Department'),
    ('Finance Department'),
    ('Legal Department');

-- Inserting Roles
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Manager', 100000, 1),
    ('Sales Representative', 80000, 1),
    ('Engineering Manager', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Finance Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Manager', 250000, 4),
    ('Lawyer', 190000, 4);

-- Inserting Employees
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Emily', 'Smith', 1, NULL),
    ('Michael', 'Johnson', 2, 1),
    ('Alex', 'Martinez', 3, NULL),
    ('Jessica', 'Walker', 4, 3),
    ('Daniel', 'Lee', 5, NULL),
    ('Olivia', 'Miller', 6, 5),
    ('David', 'Taylor', 7, NULL),
    ('Sophia', 'Scott', 8, 7);