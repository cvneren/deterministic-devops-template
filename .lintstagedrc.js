module.exports = {
  "frontend/**/*.{js,jsx,ts,tsx}": (filenames) => {
    // Extract paths relative to the frontend directory since eslint runs from there
    const relativePaths = filenames.map((f) => {
      const parts = f.split("/frontend/");
      return parts.length > 1 ? parts[1] : f;
    });

    return [
      `prettier --write ${filenames.join(" ")}`,
      `bash -c "cd frontend && npx eslint --fix ${relativePaths.join(" ")}"`,
    ];
  },
  "*.{json,yaml,yml,md,css,scss}": ["prettier --write"],
};
