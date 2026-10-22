export default function errorHandler(err, req, res, next) {
  res
    .status(err.type === "entity.too.large" ? 413 : 400)
    .json({ message: "Unable to process this request." });
}
