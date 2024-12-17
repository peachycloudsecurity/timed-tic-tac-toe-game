# Timed Tic Tac Toe Game - Hackathon Submission

This is a simple **Timed Tic Tac Toe game** built with HTML, CSS, and JavaScript. The game features:
1. A playable board where X's and O's vanish after 3 moves.
2. A scoreboard that tracks the last 10 winners using local storage.
3. Hosted on **AWS S3** as a static website using Terraform.

---

## Steps to Deploy

### 1. Prerequisites
- AWS CLI configured with IAM credentials.
- Opentofu installed.
- Visual Studio Code (VSCode) with CloudLabIDE setup.

### 2. Clone the Repository
```bash
git clone https://github.com/peachycloudsecurity/timed-tic-tac-toe-game
cd timed-tic-tac-toe-game/terraform
```

### 3. Initialize and Apply Opentofu

- Run the following commands to deploy the game to AWS S3:
```
tofu init
tofu plan
tofu apply --auto-approve
```

### 4. Access the Game

- Opentofu will output a website URL like:

```
website_url = http://tic-tac-toe-xxxx.s3-website-us-east-1.amazonaws.com
```


#### Reference:

- [tic_tac_toe_upgrade](https://www.reddit.com/r/Bestvaluepicks/comments/1fmiwda/tic_tac_toe_upgrade/)
