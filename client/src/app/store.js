import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "../components/features/game/gameSlice";
import categoriesReducer from "../components/features/categories/categoriesSlice";
import questionsReducer from "../components/features/questions/questionsSlice";


export default configureStore({
  reducer: {
    game: gameReducer,
    categories: categoriesReducer,
    questions: questionsReducer
  }

});


