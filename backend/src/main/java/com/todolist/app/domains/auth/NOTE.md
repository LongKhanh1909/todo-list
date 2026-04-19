| Action          | Request             | Response        | Logic
| Register        | RegisterRequest     | AuthResponse    | Creates user, hashes password, returns token
| Login           | LoginRequest        | AuthResponse    | Verifies password, returns token
| Logout          | None                | 204             | Handled by FE (deleting token)


@Transactional means "All or nothing" (Atomicity Property)