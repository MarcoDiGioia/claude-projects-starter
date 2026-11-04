/// <summary>
/// La versione esatta della build, scritta in un angolo nelle build di sviluppo per
/// sapere al volo quale si ha installata. In locale resta "dev"; la CI riscrive la
/// riga di Version (numero di esecuzione, commit, data) prima di esportare.
/// </summary>
public static class BuildInfo
{
	public const string Version = "dev";
}
