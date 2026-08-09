# Digital Twin 3D Portfolio

A lightweight Three.js portfolio starter that displays an interactive 3D scene and loads project-specific glTF/GLB models from `assets/models/`.

## Run locally

Because the app uses JavaScript modules, serve the repository with a local web server:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Customize

1. Add `.glb` or `.gltf` files to `assets/models/`.
2. Update the `projects` array in `main.js` with each model path, title, and description.
3. Deploy the repository with GitHub Pages from the root of the main branch.
