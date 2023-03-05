-- You have a table with id, name, countrycode, district, population.
-- You have to return the difference between the highest and lowest population.

SELECT MAX(POPULATION) - MIN(POPULATION) AS range FROM CITY;

-- https://www.hackerrank.com/challenges/population-density-difference/problem
