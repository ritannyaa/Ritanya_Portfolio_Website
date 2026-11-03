Certificate and internship scans, named after the credential they show
(`ibm-databases-sql-bmadmegp8t54.jpg`, `cognizant-networking.jpg`, …) rather
than `placeholder-N.jpg` — the filename is visible in the page source and the
network tab, so it may as well say something true.

Course certificates are named `<id>-<credential id>.jpg`, where `<id>` is the
entry's `id` in `lib/data/certificates.ts` and the credential id is the code
from its verify link, lowercased. Reference it from:

- `lib/data/certificates.ts` — `image` field
- `lib/data/experience.ts` — `certificateImage` field

**Never overwrite a scan in place — a new scan needs a new filename.**
`next.config.ts` caches optimised images for a year, keyed by URL, so a file
replaced under the same name keeps serving the old picture from the image
cache, the CDN and visitors' browsers. Putting the credential id in the name
guarantees a different certificate can't reuse an old URL.
