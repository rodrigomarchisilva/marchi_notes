# Commands order

## Coding order

* **1.** SELECT
* **2.** FROM
* **3.** WHERE
* **4.** GROUP BY
* **5.** HAVING
* **6.** ORDER BY

### Example

~~~sql
SELECT column1, column2, column3
FROM table1
WHERE column1 = 'value'
GROUP BY column1
HAVING column1 = 'value'
ORDER BY column1
~~~

## Execution order

* **1.** FROM
* **2.** WHERE
* **3.** GROUP BY
* **4.** HAVING
* **5.** SELECT
* **6.** ORDER BY
