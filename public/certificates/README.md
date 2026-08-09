Certificate and internship scans, named after the credential they show
(`ibm-databases-sql.jpg`, `cognizant-networking.jpg`, …) rather than
`placeholder-N.jpg` — the filename is visible in the page source and the
network tab, so it may as well say something true.

When adding one, match the `id` of its entry in:

- `lib/data/certificates.ts` — `image` field
- `lib/data/experience.ts` — `certificateImage` field

Reference it as `/certificates/<id>.jpg`.
