import { nanoid } from "nanoid";
import URL from "../models/url.js";

export const handleCreateShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ msg: "url is required" });
  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitCount: [],
    createdBy: req.user._id
  });
  res.redirect('/');
};
export const handleRedirectUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    if (!entry) {
      return res.status(404).json({ msg: "short url not found" });
    }
    entry.visitCount.push({ timestamp: Date.now() });
    await entry.save();

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    return res.status(500).json({ msg: "server error" });
  }
};
