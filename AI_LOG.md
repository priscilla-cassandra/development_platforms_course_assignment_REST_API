## Monday 05.10.2026

- Tool used: Claude.ai
- Purpose: Code check for POST/auth/register endpoint after coding everything. Check for bugs, misspelling, or if there is anything I have missed.
- Outcome: effective fixes of typos and minor edits, and a better understanding of password hash!
- Chat: https://claude.ai/share/8a25b915-00de-421a-ad30-7eb24c3f0caf

## Tuesday 06.10.2026

- Tool used: Claude.ai
- Purpose: Syntax explanation
- Outcome: Fresh reminder of syntax meaning, and better understanding of the “steps” being taken in the code
- Chat: https://claude.ai/share/58b12ba9-b431-43b5-b5ec-97a404941f06
  <br>
- Tool used: Claude.ai
- Purpose: Debugging and explanation of how to get the password on login when the hashed password is saved in the database
- Outcome: Better understanding of how password hashing works.
- Chat: https://claude.ai/share/84746c06-c69a-4c93-b595-897546aadd8f
  <br>
- Tool used: Claude.ai
- Purpose: Debugging and understanding case-sensitivity in emails on registering and logging in. Tried logging in with same email, but changing capitalized letter to non-capitalized, and the login still went through.
- Outcome: New knowledge that email logins should be case-insensitive in practice, and that this is mostly not a problem. And that, as a precaution, I can save all emails as lowercase in the database, so that two users can’t have the same email, even though one is capitalized (but this is not necessary, as trying to register with the same lowercase email gives an error)
- Chat: https://claude.ai/share/d0a30359-dd82-4969-994a-0d26a904c740
  <br>
- Tool used: Claude.ai
- Purpose: Code check for the POST /articles endpoint, debugging, and help with testing the POST /articles endpoint in POSTMAN
- Outcome: quick bug fix (had forgotten to import the articlesRouter). And learned a new way to test an endpoint that requires a token!
- Chat: https://claude.ai/share/38514257-e6be-4e96-9998-cfa60cda14e7

## Wednesday 07.10.2026

- Tool used: Claude.ai
- Purpose: Create articles in POSTMAN
- Outcome: Saved time by getting example data for two articles. Effective use of AI.
- Chat: https://claude.ai/share/147527d6-d5fb-4533-88f2-9d14bfd3a667
