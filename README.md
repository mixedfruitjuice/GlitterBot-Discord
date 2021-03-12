# GlitterBot-Discord
Glitterbot for discord

Glitterbot that works with the GlitterCDN to send beautiful glitter images to make you happy.

Inspired by: https://github.com/koole/glitterbot.

<b>Requirements:</b>
- Latest version of NodeJS stable release (Glitterbot was built with 15.2.1)
- A discord server ;)
- Love for glitterplaatjes

Usage:

1. Create a discord application and generate an access token.
2. Install all required packages with ```npm install```
3. Edit the .env.example and replace the value of ```DJS_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX``` with your access token provided by your discord application
4. Start GlitterBot with ```node index.js``` and receive a beautiful glitterplaatje each morning

PS you can also get a specific glitterplaatje with ```ping {category}```. For example ```ping tue``` for glitterplaatje from Tuesday.
