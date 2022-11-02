# dotnet CLI basics

## Help command

~~~powershell
dotnet --help
~~~

## CLI usage syntax

~~~powershell
Usage: dotnet [runtime-options] [path-to-application] [arguments]
~~~

## Example: Runtime options

~~~powershell
runtime-options:
  --additionalprobingpath <path>   Path containing probing policy and assemblies to probe for.
  --additional-deps <path>         Path to additional deps.json file.
  --depsfile                       Path to <application>.deps.json file.
  --fx-version <version>           Version of the installed Shared Framework to use to run the application.
  --roll-forward <setting>         Roll forward to framework version  (LatestPatch, Minor, LatestMinor, Major, LatestMajor, Disable).
  --runtimeconfig                  Path to <application>.runtimeconfig.json file.
~~~

## Example: Seek help for specific commands

~~~powershell
dotnet new --help
~~~

~~~powershell
dotnet new console --help
~~~

## Creating a console application

Console application is a .NET Core application that runs in a console window, like the CLI itself.

* Basic creation:

~~~powershell
dotnet new console
~~~

* Naming the folder:

~~~powershell
dotnet new console -o <folder_name>
~~~

## Structure of a console application

* The `Program.cs` file contains the `Main` method.

> `.cs` files are `C#` source code files.

* `<project_name>.csproj` is like the `package.json` file in Node.js.

> The `<project_name>` will be the name of the folder.

* The `obj` folder receives the dependencies after the `dotnet restore` command.

> `dotnet restore` is like `npm install`.

## How C# works

* Programming languages are high-level, and can be compiled or interpreted;
* Compiled languages need to be translated into low-level machine code before execution;
* Interpreted languages are translated into machine code during execution;
* C# is a compiled language.

## Executing the C# code

* Compile the code inside the project folder:

~~~powershell
dotnet build
~~~

> The `bin` folder will receive the compiled code.

* Run the compiled code:

~~~powershell
dotnet run
~~~

## Creating other types of applications

* List the available templates:

~~~powershell
dotnet new -l
~~~

Templates                                    | Short Name          | Language    | Tags
---------------------------------------------|---------------------|-------------|---------------------------
Console Application                          | console             |[C#], F#, VB | Common/Console
Class library                                | classlib            |[C#], F#, VB | Common/Library
WPF Application                              | wpf                 |[C#]         | Common/WPF
WPF Class library                            | wpflib              |[C#]         | Common/WPF
WPF Custom Control Library                   | wpfcustomcontrollib |[C#]         | Common/WPF
WPF User Control Library                     | wpfusercontrollib   |[C#]         | Common/WPF
Windows Forms (WinForms) Application         | winforms            |[C#]         | Common/WinForms
Windows Forms (WinForms) Class library       | winformslib         |[C#]         | Common/WinForms
Worker Service                               | worker              |[C#]         | Common/Worker/Web
Unit Test Project                            | mstest              |[C#], F#, VB | Test/MSTest
NUnit 3 Test Project                         | nunit               |[C#], F#, VB | Test/NUnit
NUnit 3 Test Item                            | nunit-test          |[C#], F#, VB | Test/NUnit
xUnit Test Project                           | xunit               |[C#], F#, VB | Test/xUnit
Razor Component                              | razorcomponent      |[C#]         | Web/ASP.NET
Razor Page                                   | page                |[C#]         | Web/ASP.NET
MVC ViewImports                              | viewimports         |[C#]         | Web/ASP.NET
MVC ViewStart                                | viewstart           |[C#]         | Web/ASP.NET
Blazor Server App                            | blazorserver        |[C#]         | Web/Blazor
ASP.NET Core Empty                           | web                 |[C#], F#     | Web/Empty
ASP.NET Core Web App (Model-View-Controller) | mvc                 |[C#], F#     | Web/MVC
ASP.NET Core Web App                         | webapp              |[C#]         | Web/MVC/Razor Pages
ASP.NET Core with Angular                    | angular             |[C#]         | Web/MVC/SPA
ASP.NET Core with React.js                   | react               |[C#]         | Web/MVC/SPA
ASP.NET Core with React.js and Redux         | reactredux          |[C#]         | Web/MVC/SPA
Razor Class Library                          | razorclasslib       |[C#]         | Web/Razor/Library/Razor Class Library
ASP.NET Core Web API                         | webapi              |[C#], F#     | Web/WebAPI
ASP.NET Core gRPC Service                    | grpc                |[C#]         | Web/gRPC
dotnet gitignore file                        | gitignore           |             | Config
global.json file                             | globaljson          |             | Config
NuGet Config                                 | nugetconfig         |             | Config
Dotnet local tool manifest file              | tool-manifest       |             | Config
Web Config                                   | webconfig           |             | Config
Solution File                                | sln                 |             | Solution
Protocol Buffer File                         | proto               |             | Web/gRPC

* Using a template:

~~~powershell
dotnet new <template_name> -o <folder_name>
~~~

## Creating a new project Web API

* Create a new project:

~~~powershell
dotnet new webapi -o <folder_name>
~~~

> There will be different files and folders from the standard console application, but the core is the same.

## Creating a new project MVC (Model-View-Controller)

~~~powershell
dotnet new mvc -o <folder_name>
~~~

> New folders will be created, such as `Controllers`, `Views` and `Models`.

## Creating a library project

~~~powershell
dotnet new classlib -o <folder_name>
~~~

> Instead of the `Program.cs` file, there will be a `Class1.cs` file, because it is not meant to be executed, but to be used as a dependency with reusable code in other projects.

## Creating a unit test project

~~~powershell
dotnet new xunit -o <folder_name>
~~~

> `xUnit` is like `Jest` for `JavaScript`.
