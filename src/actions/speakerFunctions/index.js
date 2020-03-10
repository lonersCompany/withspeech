export const play = (state, item) => {
  // IF PLAYED INDEX IS SAME AS ACTIVE INDEX
  if (state.item === item) {
    document.body.classList.toggle("speaking");
    console.log("AAAA");
    // RESUME / PAUSE

    if (state.audioObject.paused) {
      state.audioObject.play();
    } else {
      state.audioObject.pause();
    }
  } else {
    // ELSE PLAYED INDEX IS NEW

    if (state.item) {
      state.item.el.classList.remove("active");
    }
    const currentItem = item;

    state.item = currentItem;

    state.item.el.classList.add("active");

    document.body.classList.add("speaking");
    console.log(currentItem.el);
    scrollTo(currentItem.el);

    // handle index bounds... loop or no?

    if (!state.audioObject) {
      state.audioObject = new Audio(audioLink);
    }
    console.log(item.marks[0]);
    const itemStartingMark = item.marks[0];
    // Play audio
    state.audioObject.currentTime = itemStartingMark;
    console.log(state.audioObject.currentTime);
    state.audioObject.play();

    // Set recursion
    state.audioObject.addEventListener("ended", () => {
      document.body.classList.remove("speaking");
      state.item.el.classList.remove("active");
    });

    state.audioObject.addEventListener("timeupdate", function(e) {
      const currentTime = e.target.currentTime;
      state.items.forEach(item => {
        if (currentTime >= item.marks[0] && currentTime <= item.marks[1])
          if (item != state.item) {
            state.item.el.classList.remove("active");
            item.el.classList.add("active");
            state.item = item;
            scrollTo(item.el);
          }
      });
    });
  }
};
