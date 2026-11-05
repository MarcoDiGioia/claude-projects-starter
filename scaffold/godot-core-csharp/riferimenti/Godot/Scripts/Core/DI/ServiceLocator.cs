using System;
using System.Collections.Generic;

namespace APP_PROJECT.Core.DI
{
	/// <summary>
	/// ServiceLocator: Un semplice contenitore per la Dependency Injection.
	/// Registra e risolve istanze di servizi (singleton) all'interno del gioco.
	/// </summary>
	public static class ServiceLocator
	{
		private static readonly Dictionary<Type, object> _services = new Dictionary<Type, object>();

		/// <summary>
		/// Registra un'istanza di un servizio specificando il suo tipo/interfaccia.
		/// </summary>
		public static void Register<T>(T serviceInstance)
		{
			Type type = typeof(T);
			if (_services.ContainsKey(type))
			{
				// Sovrascrive il servizio se già esistente
				_services[type] = serviceInstance;
			}
			else
			{
				_services.Add(type, serviceInstance);
			}
		}

		/// <summary>
		/// Risolve l'istanza del servizio richiesto. Genera un'eccezione se non trovato.
		/// </summary>
		public static T Resolve<T>()
		{
			Type type = typeof(T);
			if (_services.TryGetValue(type, out object service))
			{
				return (T)service;
			}

			throw new InvalidOperationException($"ServiceLocator: Servizio di tipo {type.Name} non trovato.");
		}

		/// <summary>
		/// Tenta di risolvere il servizio in modo sicuro. Ritorna true se il servizio esiste.
		/// </summary>
		public static bool TryResolve<T>(out T service)
		{
			Type type = typeof(T);
			if (_services.TryGetValue(type, out object obj))
			{
				service = (T)obj;
				return true;
			}

			service = default;
			return false;
		}

		/// <summary>
		/// Rimuove un servizio dal contenitore (utile per la pulizia tra un livello e l'altro).
		/// </summary>
		public static void Unregister<T>()
		{
			Type type = typeof(T);
			if (_services.ContainsKey(type))
			{
				_services.Remove(type);
			}
		}

		/// <summary>
		/// Pulisce completamente il contenitore.
		/// </summary>
		public static void Clear()
		{
			_services.Clear();
		}
	}
}
