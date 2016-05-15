from flask import Flask
import requests
import json

app = Flask(__name__)
steamApiKey = "6F39056ADA5041ED08F9480773890A58"
interestingTeams = ["Alliance", "Evil Geniuses", "OG Dota2"]

#@app.route("/")
def getMatches():
    r = requests.get("https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v1/?key=" + steamApiKey)
    matchdata = json.loads(r.text)
    for match in matchdata["result"]["games"]:
        if "radiant_team" in match:
            for team in interestingTeams:
                if match["radiant_team"]["team_name"] == team:
                    print(match)
        elif "dire_team" in match:
            for team in interestingTeams:
                if match["dire_team"]["team_name"] == team:
                    print(match)

def getUpcomingMatches():
    r = requests.get("https://api.steampowered.com/IDOTA2Match_570/GetScheduledLeagueGames/v1/?key=" + steamApiKey)
    matchdata = json.loads(r.text)
    print(json.dumps(matchdata, indent=4, sort_keys=True))

if __name__ == '__main__':
    getMatches()
    #getUpcomingMatches()
    app.run()