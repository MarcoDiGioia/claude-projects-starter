using System;
using System.Collections.Generic;

namespace APP_PROJECT.Core.Events
{
    /// <summary>
    /// EventBus centrale: Disaccoppia la comunicazione tra i vari componenti.
    /// Invece di avere riferimenti diretti (es. Pothole chiama ContractManagerController),
    /// Pothole pubblica un evento e ContractManagerController lo ascolta.
    /// </summary>
    public static class EventBus
    {
        // Un dizionario che mappa il tipo di evento a una lista di delegate (gli iscritti)
        private static readonly Dictionary<Type, List<Delegate>> _subscribers = new Dictionary<Type, List<Delegate>>();

        /// <summary>
        /// Iscrive un handler a un tipo specifico di evento.
        /// </summary>
        public static void Subscribe<TEvent>(Action<TEvent> handler)
        {
            Type eventType = typeof(TEvent);
            if (!_subscribers.ContainsKey(eventType))
            {
                _subscribers[eventType] = new List<Delegate>();
            }

            _subscribers[eventType].Add(handler);
        }

        /// <summary>
        /// Rimuove un handler da un tipo specifico di evento.
        /// Da richiamare nel metodo _ExitTree o Dispose per evitare memory leak.
        /// </summary>
        public static void Unsubscribe<TEvent>(Action<TEvent> handler)
        {
            Type eventType = typeof(TEvent);
            if (_subscribers.TryGetValue(eventType, out var handlers))
            {
                handlers.Remove(handler);
            }
        }

        /// <summary>
        /// Pubblica un evento. Tutti gli iscritti riceveranno la notifica.
        /// </summary>
        public static void Publish<TEvent>(TEvent eventArgs)
        {
            Type eventType = typeof(TEvent);
            if (_subscribers.TryGetValue(eventType, out var handlers))
            {
                // Crea una copia locale per evitare errori se un handler si disiscrive durante la notifica
                var handlersCopy = new List<Delegate>(handlers);
                foreach (var handler in handlersCopy)
                {
                    if (handler is Action<TEvent> action)
                    {
                        action(eventArgs);
                    }
                }
            }
        }

        /// <summary>
        /// Ripulisce l'EventBus (utile al cambio di scena).
        /// </summary>
        public static void Clear()
        {
            _subscribers.Clear();
        }
    }
}
