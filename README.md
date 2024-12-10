# OpenCM
OpenCM is a simple, lightweight, and easy-to-use open-source community management system. It is designed to help you manage the posts on social media platforms, such as Facebook, Twitter, and Instagram. OpenCM is built using Golang on the backend, you can find it here [OpenCM](https://github.com/pedrodcsjostrom/opencm). This repository contains a simple web interface for OpenCM, built using ReactJS. You can implement other interfaces using the OpenCM API.

## Design choices for this frontend
- **Vite-SWC**: A fast and lightweight frontend build tool.
- **ReactJS**: Popular and easy-to-use frontend library.
- **ReactRouter**: Simple and easy-to-use routing library.
- **Redux**: Global state management library. Some people might argue that Context API is enough, but Redux is more powerful and easier to use (after you set all the tiring boilerplate). For local state management, we could use simple hooks, or even the context API, but for global state management, Redux is very easy to use imo.  
- **Styled Components**: Easy-to-use CSS-in-JS library. Again, there are a million options I just chose this one because it's popular and easy to use.

Most of these choices were made mostly on popularity and ease of use. The main goal of this frontend is to provide a simple and easy-to-use interface for OpenCM.It doesn't need to be optimized for CEO since it's a dashboard. There are a thousand ways to skin a cat, so feel free to implement your own frontend using the OpenCM API using your favorite tools.