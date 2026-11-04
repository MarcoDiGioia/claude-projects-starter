namespace APP_PROJECT.Domain.Models
{
	/// <summary>
	/// Dati persistiti dal SaveService (serializzati in JSON in user://savegame.json).
	/// Aggiungere qui i campi del profilo; i valori di default sono quelli di un nuovo giocatore.
	/// </summary>
	public class SaveData
	{
		public int Version { get; set; } = 1;
	}
}
