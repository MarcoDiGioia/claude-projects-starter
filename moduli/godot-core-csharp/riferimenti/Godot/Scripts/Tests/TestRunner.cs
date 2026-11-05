using System;
using System.Linq;
using System.Reflection;
using Godot;

[AttributeUsage(AttributeTargets.Method)]
public class GodotTestAttribute : Attribute { }

public partial class TestRunner : Node
{
    public override void _Ready()
    {
        // Solo in headless o se viene passato --run-tests
        if (OS.GetCmdlineArgs().Contains("--run-tests") || OS.HasFeature("dedicated_server"))
        {
            RunTests();
            GetTree().Quit();
        }
    }

    public static void RunTests()
    {
        var assembly = Assembly.GetExecutingAssembly();
        var types = assembly.GetTypes().Where(t => t.Namespace != null && t.Namespace.StartsWith("APP_PROJECT.Tests"));
        
        int passed = 0;
        int failed = 0;

        GD.Print("\n--- INIZIO UNIT TESTS ---");

        foreach (var type in types)
        {
            var methods = type.GetMethods().Where(m => m.GetCustomAttribute<GodotTestAttribute>() != null);
            if (!methods.Any()) continue;

            object instance = null;
            if (!type.IsAbstract || !type.IsSealed) // non static
            {
                instance = Activator.CreateInstance(type);
            }

            foreach (var method in methods)
            {
                try
                {
                    method.Invoke(instance, null);
                    GD.Print($"[PASS] {type.Name}.{method.Name}");
                    passed++;
                }
                catch (Exception e)
                {
                    GD.PrintErr($"[FAIL] {type.Name}.{method.Name}");
                    GD.PrintErr(e.InnerException?.Message ?? e.Message);
                    failed++;
                }
            }
        }

        GD.Print($"--- FINE UNIT TESTS: {passed} Passati, {failed} Falliti ---\n");
    }
}

public static class Assert
{
    public static void IsTrue(bool condition, string message = "Expected true but was false")
    {
        if (!condition) throw new Exception(message);
    }
    
    public static void IsFalse(bool condition, string message = "Expected false but was true")
    {
        if (condition) throw new Exception(message);
    }
    
    public static void AreEqual<T>(T expected, T actual, string message = null)
    {
        if (!Equals(expected, actual)) 
            throw new Exception(message ?? $"Expected {expected} but got {actual}");
    }
}
