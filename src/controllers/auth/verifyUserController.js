exports.verifyUser = (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: "Kullanıcı başarıyla doğrulandı",
      user: req.user,
    });
  } else {
    res.status(500).send("Kullanıcı doğrulanamadı");
  }
};
