# Regole tecniche: dominio e modelli dati (@APP_SCOPE/shared)

**Single source of truth:** tutto ciò che viene scambiato tra client e server vive in questo pacchetto. Mai duplicare interfacce tra frontend e backend.

## Linee guida
1. **Zod first:** definire prima lo schema Zod (validazione a runtime) e dedurre il tipo con `z.infer<typeof Schema>`. Non scrivere a mano un'interfaccia se esiste già lo schema.
2. **Payload (DTO):** per ogni entità esportare schemi distinti: `CreateXSchema`, `UpdateXSchema` (campi opzionali), `XResponseSchema` (senza dati sensibili).
3. **Costanti ed enum:** valori fissi, stati e ruoli sono costanti qui, mai stringhe sparse in UI o servizi.

## Comandi (dalla radice)
- `npm run build:shared`: ricompila il pacchetto. **Obbligatorio dopo ogni modifica.**
- `npm run test:shared`: esegue i test degli schemi (`src/**/*.test.ts`, escluse dal build).
