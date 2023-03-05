-- You are given two tables, Students and Grades.
-- Students contains three columns ID, Name and Marks.
-- Grades contains the Min_Mark and Max_Mark that a student can obtain to get a grade between 0 and 10.
-- You have to return the Name if grade is bigger than 8, otherwise return NULL.
-- You also have to return the grade of the student, from 0 to 10.
-- And finally, you have to return the Marks of the student.

SELECT
    CASE WHEN G.Grade < 8 THEN 'NULL' ELSE S.Name END,
    G.Grade,
    S.Marks
FROM Students as S
JOIN Grades as G
ON S.Marks BETWEEN G.Min_Mark AND G.Max_Mark
ORDER BY G.Grade DESC, S.Name;

-- https://www.hackerrank.com/challenges/the-report/problem
