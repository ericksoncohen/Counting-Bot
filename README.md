# Counting-Bot


**Developed By Cohen For BTE Counting**


# Setup
**1.** Fork this project on https://repl.it and start the project, You will have errors.

**2.** A white box will pop up on the left that says "Bot is Online!", copy the url found above.

**3.** Now go to uptimerobot.com and sign up.

**4.** Click on "Add New Monitor"

**5.** Select "HTTP(s)"

**6.** Give it a friendly name

**7.** And paste in the url where it says "URL (or IP)"

**8.** Then click on "Create Monitor", Then "! Create Monitor (with no alert contact selected)"

**9.** Now you want to enable Discord devleoper mode located in Settings => Appearance, scrool down to advanced and turn on "Developer Mode"

**10.** Now you can right click on the counting discord channel and click on "Copy ID", Then you want to locate the .env file in your repl project and paste it after the = COOUNT_CHANNEL_ID={PASTE HERE}

**11.** Now go back to discord and go into Server Settings => Roles and right click on your level one counter role, then "Copy ID"

**12.** Go back to Repl and paste it in the .env as shown LEVEL_ONE_ID={PASTE HERE}

**13.** Repeat the previous steps for all 5 reward roles.

**14.** Now your almost done, all you have to do is make the bot. Go to https://discord.com/developers/applications and click on "New Application", Name it whatever you want.

**15.** Now on the side click on "Bot", Then "Add Bot". Here you can change the bot's name and avatar(this can be done at a later date).

**16.** Once you have named and changed the avatar of your bot you want to copy your bots token, this can be found under where you changed it's username.

**17.** Now paste this token into the .env file under TOKEN={PASTE HERE}

**18.** Now all you need to do is invite the bot, Now go back to the discord developer portal page for your bot and click on "OAuth2", Where you see a bunch of checkboxes select "bot". Now you want to scrool down where it says "BOT PERMISSIONS" and select "Manage Roles, View Channels, Send Messages, and Read Message History" Or alternativly just "Administrator". Now you want to click to copy the url above where it says "BOT PERMISSIONS", Paste this url into your browser, then select the server you want to add the bot on and authorize it.

**19.** You should be done now, just restart your repl project and the bot should go online!

# Commands


**{prefix}count** Tells you what the current count is at.

**{prefix}count set \<number>** Sets the current count to what may be already started.
