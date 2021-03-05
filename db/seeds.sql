INSERT INTO department (id,name)
VALUES
  (1,'FINANCE'),
  (2,'MARKETING'),
  (3,'R&D'),
  (4,'IT'),
  (5, 'Human Resources'),
  (6,'Sales'),
  (7, 'Services');

INSERT INTO roles (id,title, salary, department_id)
VALUES
    (1,'marketing operations analyst', 50000, 2),
    (2,'accounts payable specialis',50000,1),
    (3,'software engineer',120000,3),
    (4,'database architect',13000,4),
    (5,'hr specialist', 60000,5),
    (6,'sales executive', 100000,6),
    (7,'services analyst', 70000,7);

    INSERT into employee (id, first_name, last_name, role_id, manager_id)
    VALUES
    (1001,'Michael', 'Scott', 6, NULL),
    (1002,'Toby', 'Flenderson', 5, 1001),
    (1003,'Kevin', 'Malone', 1, 1001),
    (1004,'Nick', 'The IT Guy', 4,1001);