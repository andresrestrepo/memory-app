import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

import { SafeArea } from "capacitor-plugin-safe-area";

SafeArea.getSafeAreaInsets().then((data) => {
  const { insets } = data;
  const title = document.getElementById("title-game")
  title.style.setProperty("margin-top", `${insets.top}px`);

});

SafeArea.addListener('safeAreaChanged', data => {
  const { insets } = data;
  const title = document.getElementById("title-game")
  title.style.setProperty("margin-top", `${insets.top}px`);
});

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
