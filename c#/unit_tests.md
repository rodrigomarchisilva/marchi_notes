# Testing with xUnit

## Creating a new xUnit project

~~~powershell
dotnet new xunit -o <project_name>
~~~

* Folder structure:

  * project.Test
    * bin
    * obj
      * Debug
      * project.assets.json
      * project.nuget.cache
      * project.Test.csproj.nuget.dgspec.json
      * project.Test.csproj.nuget.g.props
      * project.Test.csproj.nuget.g.targets
    * project.Test.csproj
    * UnitTest1.cs

* The xUnit version can be found in the `project.Test.csproj` file.
* File `UnitTest1.cs` contains the test code.

---

## Test initial structure

~~~csharp
using Xunit;

namespace project.Test
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            Assert.Equal(1, 1);
        }
    }
}
~~~

## Function to be tested

~~~csharp
public static int Sum(int number1, int number2) 
{
    var result = number1 + number2;
    return result;
}
~~~

## Test cases

~~~csharp
Sum(3, 3) // 6
Sum(-10, 3) // -7
Sum(77, 33) // 110
~~~

## Basic test code

~~~csharp
[Fact]
public void TestSum()
{
    Assert.Equal(Sum(77, 33), 110);
}
~~~

---

## Fluent Assertions

Library that improves the readability of the tests.

~~~powershell
dotnet add package FluentAssertions --version 6.5.1
~~~

To confirm the installation, use the command:

~~~powershell
dotnet restore
~~~

Test code:

~~~csharp
[Fact]
public void TestSumFluent()
{
    result = Sum(77, 33)
    result.Should().Be(110)
}
~~~

* Fluent assertions documentation: <https://fluentassertions.com/introduction>

---

## Data annotations

Markers to identify the tests, describe them or pass parameters.

* `Fact` - Identifies a test that does not receive parameters (static).

* `Theory` - Identifies a test that receives parameters (dynamic).

* `DisplayName` - Improves readability of the test.

Test code with `Theory`:

~~~csharp
[Theory(DisplayName = "Must correctly sum two numbers.")]
[InlineData(3, 3, 6)]
[InlineData(-10, 3, -7)]
[InlineData(77, 33, 110)]
public void TestSumFluent(int entry1, int entry2, int expected)
{
    result = Sum(entry1, entry2)
    result.Should().Be(expected)
}
~~~

---

## Practicing with an application

Create a new console application:

~~~powershell
dotnet new console -o greet
~~~

On the `Program.cs` file, add the following code:

~~~csharp
namespace greet;

public class Class1
{
    public static string Greet()
    {
        return "Hello World!";
    }
}
~~~

## Create the test project

~~~powershell
dotnet new xunit -o greet.Test
~~~

> As good practice, the test project should have the same name as the application, but with the `.Test` suffix.

Add the `FluentAssertions` library:

~~~powershell
cd greet.Test
dotnet add greet.Test package FluentAssertions --version 6.5.1
~~~

How to add the application project as a reference to the test project:

~~~powershell
dotnet add reference ../greet/greet.csproj
~~~

## Test code

~~~csharp
using Xunit;
using FluentAssertions;

namespace greet.Test;

public class UnitTest1
{
    [Theory(DisplayName = "Must return 'Hello World!'")]
    [InlineData("Hello World!")]
    public void TestGreet(string expected)
    {
        var result = Class1.Greet();
        result.Should().Be(expected);
    }
}
~~~

## Running the test

~~~powershell
dotnet test
~~~
