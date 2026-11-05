using Godot;
using System.Text.Json;
using APP_PROJECT.Domain.Models;

namespace APP_PROJECT.Core.Services
{
	public class SaveService
	{
		// Il percorso "user://" è gestito in automatico da Godot
		private const string SavePath = "user://savegame.json";

		public void Save(SaveData data)
		{
			// Serializziamo in formato JSON
			string jsonString = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
			
			// Apriamo il file in modalità scrittura (crea o sovrascrive)
			using var file = FileAccess.Open(SavePath, FileAccess.ModeFlags.Write);
			
			if (file != null)
			{
				file.StoreString(jsonString);
			}
			else
			{
				GD.PrintErr($"Errore durante il salvataggio: {FileAccess.GetOpenError()}");
			}
		}

		public SaveData Load()
		{
			// Se il salvataggio non esiste, restituiamo un nuovo profilo base
			if (!FileAccess.FileExists(SavePath))
			{
				return new SaveData();
			}

			using var file = FileAccess.Open(SavePath, FileAccess.ModeFlags.Read);
			string jsonString = file.GetAsText();
			
			try 
			{
				return JsonSerializer.Deserialize<SaveData>(jsonString) ?? new SaveData();
			}
			catch (JsonException ex)
			{
				GD.PrintErr($"Salvataggio corrotto, ne creo uno nuovo. Errore: {ex.Message}");
				return new SaveData(); // Fallback in caso di manomissione del file
			}
		}
	}
}
