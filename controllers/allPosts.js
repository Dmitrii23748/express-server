export const allPosts = (req, res) => {
  try {

    res.json([
      {
        title: "post 1",
        text: "text 1",
      },
      {
        title: "post 2",
        text: "text 2",
      },
      {
        title: "post 3",
        text: "text 3",
      },
    ]);
  } catch (error) {
    res.json({ message: "Нет постов" });
  }
};
