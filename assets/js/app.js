const buttonClick = document.getElementById('searchButton');
const inputField = document.getElementById('searchBar');
const apiField = document.getElementById('apiKey');
const select = document.getElementById("matchNSelector");

buttonClick.addEventListener('click', logJSONData);


inputField.addEventListener("keydown", function (event) {

    // Checking if key pressed is ENTER or not
    // if the key pressed is ENTER
    // click listener on button is called
    if (event.key == "Enter") {
        buttonClick.click();
    }
    if (event.key == "ArrowUp") {
        select.value = parseInt(select.value) + 1;
    } else if (event.key == "ArrowDown") {
        select.value = parseInt(select.value) - 1;
    }

    // if (event.key == "Enter") {
    //     buttonClick.click();
    // }
});



async function logJSONData(event) {

    const result = document.getElementById("result");
    result.style.cssText = "";
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }

    // https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Ivogada?api_key=
    //  RGAPI-32e968ff-a0a6-4a5c-97c6-a16879dba648
    const apiKey = apiField.value;
    console.log(apiKey);

    try {
    
    // const urlAccountData = `https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${document.getElementById('searchBar').value}`;
    const urlAccountData = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${document.getElementById('searchBar').value}?api_key=${apiKey}`;


    const accDataResponse = await fetch(urlAccountData);
    const accData = await accDataResponse.json();
    console.log(accData);
    const puuid = accData.puuid;
    console.log(accData.puuid);
    const matchCount = document.getElementById("matchNSelector").value;
    //set to 1 for testing
    const urlMatchesData = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${matchCount}&api_key=${apiKey}`;
    const matchesDataResponse = await fetch(urlMatchesData);
    const matches = await matchesDataResponse.json();
    console.log(matches);

    for (let i = 0; i < matches.length; i++) {

        // Main Match Container - contains all of the match data
        const mainMatchContainer = document.createElement("div");
        mainMatchContainer.className = "mainMatchContainer";

        // Personal Stats Side - contains the stats of the player
        const personalStatsSide = document.createElement("div");
        personalStatsSide.className = "personalStatsSide";

        // Other Stats Side - contains the stats of the other players
        const otherStatsSide = document.createElement("div");
        otherStatsSide.className = "otherStatsSide";

        // Win Lose Field - contains the win or lose text
        const winLoseField = document.createElement("div");
        winLoseField.className = "winLoseField";
        const leftSide = document.createElement("div");
        leftSide.className = "leftSide";

        const rightSide = document.createElement("div");
        rightSide.className = "rightSide";

        // Team Players - contains the players of a team
        const teamPlayers = document.createElement("div");
        teamPlayers.className = "teamPlayers";
        const blueTeamPlayers = document.createElement("div");
        blueTeamPlayers.className = "blueTeamPlayers";
        const redTeamPlayers = document.createElement("div");
        redTeamPlayers.className = "redTeamPlayers";
        const leftSideStats = document.createElement("div");
        leftSideStats.className = "leftSideStats";
        const rightSideStats = document.createElement("div");
        rightSideStats.className = "rightSideStats";


        result.appendChild(mainMatchContainer);
        mainMatchContainer.appendChild(personalStatsSide);
        mainMatchContainer.appendChild(otherStatsSide);
        otherStatsSide.appendChild(winLoseField);
        winLoseField.appendChild(leftSide);
        winLoseField.appendChild(rightSide);
        otherStatsSide.appendChild(teamPlayers);
        teamPlayers.appendChild(blueTeamPlayers);
        teamPlayers.appendChild(redTeamPlayers);







        // Data handling

        //  "https://raw.communitydragon.org/13.9/game/assets/characters/aatrox/hud/aatrox_square.png" icon
        //  "https://raw.communitydragon.org/13.9/game/assets/characters/aatrox/hud/aatrox_circle.png" icon
        //  "https://raw.communitydragon.org/13.9/game/assets/characters/${championName}/hud/${championName}_circle.png" icon


        const matchID = matches[i];
        const urlMatchData = `https://europe.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${apiKey}`;
        const matchDataResponse = await fetch(urlMatchData);
        const matchData = await matchDataResponse.json();

        let wonMatch = false;
        console.log(matchData);
        for (let j = 0; j < matchData.info.participants.length; j++) {
            if (j == 0) {
                console.log(`Team Blue ${(matchData.info.teams[0].win) ? "Win" : "Lose"} `);

                if (matchData.info.teams[0].win) {
                    leftSide.innerHTML = "Win";

                    leftSide.style.backgroundColor = "#2F83EA";

                } else {
                    leftSide.innerHTML = "Lose";

                    leftSide.style.backgroundColor = "#F2453C";
                }

            } else if (j == 5) {
                console.log(`Team Red ${(matchData.info.teams[1].win) ? "Win" : "Lose"} `);
                if (matchData.info.teams[1].win) {
                    rightSide.innerHTML = "Win";
                    rightSide.style.backgroundColor = "#2F83EA";

                } else {
                    rightSide.innerHTML = "Lose";
                    rightSide.style.backgroundColor = "#F2453C";
                }
            }










            if (matchData.info.participants[j].summonerName.toLowerCase() == document.getElementById('searchBar').value.toLowerCase()) {

                //left side table creation
                function createDiv(divName, appendDiv) {
                    const div = document.createElement("div");
                    div.className = `${divName}`;
                    appendDiv.appendChild(div);
                    return div;
                }



                const playerStatsTopHalf = document.createElement("div");
                playerStatsTopHalf.className = "playerStatsTopHalf";
                personalStatsSide.appendChild(playerStatsTopHalf);
                const playerStatsTopHalfLeft = document.createElement("div");
                playerStatsTopHalfLeft.className = "playerStatsTopHalfLeft";
                playerStatsTopHalf.appendChild(playerStatsTopHalfLeft);
                const playerStatsTopHalfRight = document.createElement("div");
                playerStatsTopHalfRight.className = "playerStatsTopHalfRight";
                playerStatsTopHalf.appendChild(playerStatsTopHalfRight);
                const playerStatsTopHalfLeftUp = document.createElement("div");
                playerStatsTopHalfLeftUp.className = "playerStatsTopHalfLeftUp";
                playerStatsTopHalfLeft.appendChild(playerStatsTopHalfLeftUp);
                const playerStatsTopHalfLeftDown = document.createElement("div");
                playerStatsTopHalfLeftDown.className = "playerStatsTopHalfLeftDown";
                playerStatsTopHalfLeft.appendChild(playerStatsTopHalfLeftDown);
                const playerStatsTopHalfRightUp = document.createElement("div");
                playerStatsTopHalfRightUp.className = "playerStatsTopHalfRightUp";
                playerStatsTopHalfRight.appendChild(playerStatsTopHalfRightUp);
                const playerStatsTopHalfRightDown = document.createElement("div");
                playerStatsTopHalfRightDown.className = "playerStatsTopHalfRightDown";
                playerStatsTopHalfRight.appendChild(playerStatsTopHalfRightDown);
                const playerStatsBottomHalf = document.createElement("div");
                playerStatsBottomHalf.className = "playerStatsBottomHalf";
                personalStatsSide.appendChild(playerStatsBottomHalf);
                const playerStatsBottomHalfLeft = document.createElement("div");
                playerStatsBottomHalfLeft.className = "playerStatsBottomHalfLeft";
                playerStatsBottomHalf.appendChild(playerStatsBottomHalfLeft);
                const playerStatsBottomHalfRight = document.createElement("div");
                playerStatsBottomHalfRight.className = "playerStatsBottomHalfRight";
                playerStatsBottomHalf.appendChild(playerStatsBottomHalfRight);
                const playerStatsBottomHalfLeftUp = document.createElement("div");
                playerStatsBottomHalfLeftUp.className = "playerStatsBottomHalfLeftUp";
                playerStatsBottomHalfLeft.appendChild(playerStatsBottomHalfLeftUp);
                const playerStatsBottomHalfLeftDown = document.createElement("div");
                playerStatsBottomHalfLeftDown.className = "playerStatsBottomHalfLeftDown";
                playerStatsBottomHalfLeft.appendChild(playerStatsBottomHalfLeftDown);
                const playerStatsBottomHalfRightUp = document.createElement("div");
                playerStatsBottomHalfRightUp.className = "playerStatsBottomHalfRightUp";
                playerStatsBottomHalfRight.appendChild(playerStatsBottomHalfRightUp);
                const playerStatsBottomHalfRightDown = document.createElement("div");
                playerStatsBottomHalfRightDown.className = "playerStatsBottomHalfRightDown";
                playerStatsBottomHalfRight.appendChild(playerStatsBottomHalfRightDown);

                const championNamePlayer = document.createElement("div");
                championNamePlayer.className = "championNamePlayer";
                championNamePlayer.innerHTML = `${matchData.info.participants[j].championName}`;
                playerStatsTopHalfLeftUp.appendChild(championNamePlayer);

                const playerWinLose = document.createElement("div");
                playerWinLose.className = "playerWinLose";
                playerWinLose.innerHTML = `${(matchData.info.participants[j].win) ? "Win" : "Lose"}`;
                playerStatsTopHalfRightUp.appendChild(playerWinLose);
                const playerKDAContainer = document.createElement("div");
                playerKDAContainer.className = "playerKDAContainer";
                playerStatsTopHalfLeftUp.appendChild(playerKDAContainer);
                const playerKDA = document.createElement("div");
                playerKDA.className = "playerKDA";
                playerKDA.innerHTML = `KDA: ${matchData.info.participants[j].kills}/${matchData.info.participants[j].deaths}/${matchData.info.participants[j].assists}`;
                playerKDAContainer.appendChild(playerKDA);








                // (matchData.info.participants[j].kills + matchData.info.participants[j].assists) / matchData.info.teams[0].objectives.champion.kills) * 100)



                const playerKP = document.createElement("div");
                playerKP.className = "playerKP";
                playerKP.innerHTML = getPlayerKP(matchData.info.participants[j].kills,
                    matchData.info.participants[j].assists, matchData.info.teams[0].objectives.champion.kills, matchData.info.teams[1].objectives.champion.kills,
                    matchData.info.participants[j].teamId);

                playerKDAContainer.appendChild(playerKP);





















                const playerCS = document.createElement("div");
                playerCS.className = "playerCS";
                playerCS.innerHTML = `${matchData.info.participants[j].totalMinionsKilled + matchData.info.participants[j].neutralMinionsKilled} CS`;
                playerStatsTopHalfRightUp.appendChild(playerCS);

                const playerChampionIcon = document.createElement("img");
                playerChampionIcon.className = "playerChampionIcon";

                playerStatsTopHalfLeftDown.appendChild(playerChampionIcon);
                getChampionIcon(playerChampionIcon, matchData.info.participants[j].championName);

                const playerDamageDealt = document.createElement("div");
                playerDamageDealt.className = "playerDamageDealt";
                playerDamageDealt.innerHTML = `DD:${matchData.info.participants[j].totalDamageDealtToChampions}`;
                playerStatsTopHalfRightDown.appendChild(playerDamageDealt);
                const playerDamageTaken = document.createElement("div");
                playerDamageTaken.className = "playerDamageTaken";
                playerDamageTaken.innerHTML = `DT:${matchData.info.participants[j].totalDamageTaken}`;
                playerStatsTopHalfRightDown.appendChild(playerDamageTaken);
                const playerQueueType = document.createElement("div");
                playerQueueType.className = "playerQueueType";
                playerQueueType.innerHTML = getQueueType(matchData.info.queueId);
                playerStatsBottomHalfRightUp.appendChild(playerQueueType);
                const playerRole = document.createElement("div");
                playerRole.className = "playerRole";

                const playerRoleText = document.createElement("div");
                playerRoleText.className = "playerRoleText";
                const playerRoleIcon = document.createElement("img");
                playerRoleIcon.className = "playerRoleIcon";
                playerRole.appendChild(playerRoleIcon);
                playerRole.appendChild(playerRoleText);
                //https://raw.githubusercontent.com/esports-bits/lol_images/master/role_lane_icons/ADC.png
                switch (matchData.info.participants[j].teamPosition) {
                    case "TOP": playerRoleText.innerHTML = "Top"; break;
                    case "JUNGLE": playerRoleText.innerHTML = "Jungle"; break;
                    case "MIDDLE": playerRoleText.innerHTML = "Middle"; break;
                    case "BOTTOM": playerRoleText.innerHTML = "ADC"; break;
                    case "UTILITY": playerRoleText.innerHTML = "Support"; break;
                    default: playerRoleText.innerHTML = `${matchData.info.participants[j].teamPosition}`; break;
                }

                playerRoleIcon.src = `https://raw.githubusercontent.com/esports-bits/lol_images/master/role_lane_icons/${playerRoleText.innerHTML.toUpperCase()}.png`;
                console.log(playerRoleText.innerHTML.toUpperCase());

                playerStatsBottomHalfRightUp.appendChild(playerRole);
                const playerSumSpells = document.createElement("div");
                playerSumSpells.className = "playerSumSpells";
                const playerSumSpell1 = document.createElement("img");
                playerSumSpell1.className = "playerSumSpell1";
                playerSumSpells.appendChild(playerSumSpell1);
                const playerSumSpell2 = document.createElement("img");
                playerSumSpell2.className = "playerSumSpell2";
                playerSumSpells.appendChild(playerSumSpell2);

                //https://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/SummonerExhaust.png
                playerSumSpell1.src = getSummonerSpellIcon(matchData.info.participants[j].summoner1Id);
                playerSumSpell2.src = getSummonerSpellIcon(matchData.info.participants[j].summoner2Id);


                playerStatsBottomHalfLeftUp.appendChild(playerSumSpells);


                const playerRunes = document.createElement("div");
                playerRunes.className = "playerRunes";
                const playerRune1 = document.createElement("img");
                playerRune1.className = "playerRune1";
                playerRunes.appendChild(playerRune1);
                const playerRune2 = document.createElement("img");
                playerRune2.className = "playerRune2";
                playerRunes.appendChild(playerRune2);
                // playerRune1.src = `https://ddragon.leagueoflegends.com/cdn/img/${matchData.info.participants[j].perks.styles[0].selections[0].perk}.png`;

                playerStatsBottomHalfLeftUp.appendChild(playerRunes);

                // EXPORT IN FUNCTION LATER
                console.log("AAAAAAAAAAAUGH")
                playerRune1.src = getKeystoneRuneIcon(matchData.info.participants[j].perks.styles[0].selections[0].perk);
                console.log("AAAAAAAAAAAUGH    2")
                playerRune2.src = getSecondaryRuneIcon(matchData.info.participants[j].perks.styles[1].style);
                //  matchData.info.participants[j].perks.styles[0].selections[0].perk
                //  matchData.info.participants[j].perks.styles[1].style

                // playerRune2.src = `https://ddragon.leagueoflegends.com/cdn/img/${matchData.info.participants[j].perks.styles[1].selections[0].perk}.png`;




                // array.forEach(element => {

                // });


                const playerBuild = document.createElement("div");
                playerBuild.className = "playerBuild";

                for (let k = 0; k < 6; k++) {
                    const playerBuildItem = document.createElement("img");
                    playerBuildItem.className = "playerBuildItem";

                    if (matchData.info.participants[j][`item${k}`] != 0) {
                        playerBuildItem.src = `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${matchData.info.participants[j][`item${k}`]}.png`
                        playerBuild.appendChild(playerBuildItem);

                    }

                    function getPlayerBuild(parentDiv, itemID) {
                        const playerBuildItem = document.createElement("img");
                        playerBuildItem.className = "playerBuildItem";
                        if (matchData.info.participants[j][`item${k}`] != 0) {
                            playerBuildItem.src = `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${matchData.info.participants[j][`item${k}`]}.png`
                            playerBuild.appendChild(playerBuildItem);

                        }
                    }

                }




                playerStatsBottomHalfLeftDown.appendChild(playerBuild);

                const baitPings = document.createElement("div");
                baitPings.className = "baitPings";
                const baitPingsIcon = document.createElement("img");
                baitPingsIcon.src = `https://i.redd.it/i-made-a-low-quality-transparent-png-of-the-bait-ping-go-v0-p9r1z7dyhz3a1.png?width=1000&format=png&auto=webp&s=0edbe1505d64e05cc14c27d806aa94c5981b2f76`;
                baitPingsIcon.className = "baitPingsIcon";
                const baitPingsText = document.createElement("div");
                baitPingsText.className = "baitPingsText";
                baitPingsText.innerHTML = `${matchData.info.participants[j].baitPings}`;
                baitPings.appendChild(baitPingsIcon);
                baitPings.appendChild(baitPingsText);
                playerStatsBottomHalfRightDown.appendChild(baitPings);

            }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////     Win or Lose Display      //////////////////////////////TESTINGS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            const player = document.createElement("div");
            player.className = `player`;
            player.id = `id${j} `;
            player.style.color = "";
            const playerStatsLeft = document.createElement("div");
            playerStatsLeft.className = "playerStatsLeft";
            player.appendChild(playerStatsLeft);
            const playerStatsMid = document.createElement("div");
            playerStatsMid.className = "playerStatsMid";
            player.appendChild(playerStatsMid);
            const playerStatsRight = document.createElement("div");
            playerStatsRight.className = "playerStatsRight";
            player.appendChild(playerStatsRight);

            const oPlayerIcon = document.createElement("img");
            oPlayerIcon.className = "oPlayerIcon";
            getChampionIcon(oPlayerIcon, matchData.info.participants[j].championName);
            playerStatsLeft.appendChild(oPlayerIcon);
            const oChampionName = document.createElement("div");
            oChampionName.className = "oChampionName";
            oChampionName.innerHTML = `${matchData.info.participants[j].championName}`;
            playerStatsLeft.appendChild(oChampionName);
            const oPlayerName = document.createElement("div");
            oPlayerName.className = "oPlayerName";
            oPlayerName.innerHTML = `${matchData.info.participants[j].summonerName}`;
            playerStatsMid.appendChild(oPlayerName);
            const oPlayerKDA = document.createElement("div");
            oPlayerKDA.className = "oPlayerKDA";
            oPlayerKDA.innerHTML = `${matchData.info.participants[j].kills} / ${matchData.info.participants[j].deaths} / ${matchData.info.participants[j].assists}  `;
            playerStatsMid.appendChild(oPlayerKDA);
            const oPlayerKP = document.createElement("div");
            oPlayerKP.className = "oPlayerKP";
            oPlayerKP.innerHTML = `${getPlayerKP(matchData.info.participants[j].kills,
                matchData.info.participants[j].assists, matchData.info.teams[0].objectives.champion.kills, matchData.info.teams[1].objectives.champion.kills,
                matchData.info.participants[j].teamId)
                }`;
            playerStatsMid.appendChild(oPlayerKP);
            const oPlayerDD = document.createElement("div");
            oPlayerDD.className = "oPlayerDD";
            oPlayerDD.innerHTML = `DD: ${matchData.info.participants[j].totalDamageDealtToChampions}`;
            playerStatsMid.appendChild(oPlayerDD);
            oPlayerDT = document.createElement("div");
            oPlayerDT.className = "oPlayerDT";
            oPlayerDT.innerHTML = `DT: ${matchData.info.participants[j].totalDamageTaken}`;
            playerStatsMid.appendChild(oPlayerDT);

            const oPlayerCSVSBP = document.createElement("div");
            oPlayerCSVSBP.className = "oPlayerCSVSBP";
            playerStatsRight.appendChild(oPlayerCSVSBP);




            const oPlayerCS = document.createElement("div");
            oPlayerCS.className = "oPlayerCS";
            oPlayerCS.innerHTML = `${matchData.info.participants[j].totalMinionsKilled + matchData.info.participants[j].neutralMinionsKilled} CS`;
            oPlayerCSVSBP.appendChild(oPlayerCS);
            const oPlayerVS = document.createElement("div");
            oPlayerVS.className = "oPlayerVS";
            oPlayerVS.innerHTML = `${matchData.info.participants[j].visionScore} VS`;
            oPlayerCSVSBP.appendChild(oPlayerVS);
            const oBaitPings = document.createElement("div");
            oBaitPings.className = "oBaitPings";
            const oBaitPingsIcon = document.createElement("img");
            oBaitPingsIcon.src = `https://i.redd.it/i-made-a-low-quality-transparent-png-of-the-bait-ping-go-v0-p9r1z7dyhz3a1.png?width=1000&format=png&auto=webp&s=0edbe1505d64e05cc14c27d806aa94c5981b2f76`;
            oBaitPingsIcon.className = "oBaitPingsIcon";
            const obaitPingsText = document.createElement("div");
            obaitPingsText.className = "obaitPingsText";
            obaitPingsText.innerHTML = `${matchData.info.participants[j].baitPings}`;
            oBaitPings.appendChild(oBaitPingsIcon);
            oBaitPings.appendChild(obaitPingsText);
            oPlayerCSVSBP.appendChild(oBaitPings);

            oSumsRunesItems = document.createElement("div");
            oSumsRunesItems.className = "oSumsRunesItems";
            playerStatsRight.appendChild(oSumsRunesItems);
            oSumsRunes = document.createElement("div");
            oSumsRunes.className = "oSumsRunes";
            oSumsRunesItems.appendChild(oSumsRunes);
            oSums = document.createElement("div");
            oSums.className = "oSums";
            oSumsRunes.appendChild(oSums);
            oSumsIcon1 = document.createElement("img");
            oSumsIcon1.className = "oSumsIcon";
            oSumsIcon1.src = getSummonerSpellIcon(matchData.info.participants[j].summoner1Id);
            oSums.appendChild(oSumsIcon1);
            oSumsIcon2 = document.createElement("img");
            oSumsIcon2.className = "oSumsIcon";
            oSumsIcon2.src = getSummonerSpellIcon(matchData.info.participants[j].summoner2Id);
            oSums.appendChild(oSumsIcon2);
            oRunes = document.createElement("div");
            oRunes.className = "oRunes";
            oSumsRunes.appendChild(oRunes);
            oRuneIcon1 = document.createElement("img");
            oRuneIcon1.className = "oRuneIcon1";
            oRuneIcon1.src = getKeystoneRuneIcon(matchData.info.participants[j].perks.styles[0].selections[0].perk);
            oRunes.appendChild(oRuneIcon1);
            oRuneIcon2 = document.createElement("img");
            oRuneIcon2.className = "oRuneIcon2";
            oRuneIcon2.src = getSecondaryRuneIcon(matchData.info.participants[j].perks.styles[1].style);
            oRunes.appendChild(oRuneIcon2);
            oItems = document.createElement("div");
            oItems.className = "oItems";
            oSumsRunesItems.appendChild(oItems);
            for (let k = 0; k < 6; k++) {
                const playerBuildItem = document.createElement("img");
                playerBuildItem.className = "oPlayerBuildItem";

                if (matchData.info.participants[j][`item${k}`] != 0) {
                    playerBuildItem.src = `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/${matchData.info.participants[j][`item${k}`]}.png`
                    oItems.appendChild(playerBuildItem);

                }



            }


            if (j < 5) {

                blueTeamPlayers.appendChild(player);

            } else {
                redTeamPlayers.appendChild(player);
            }







        }
        // End of Data handling











    }





    }
    catch (error) {
        //https://media.discordapp.net/attachments/808668044879724606/1070478422922494052/hapi_cat-2.gif
        const Error = document.getElementById("result");
        Error.style.display = "grid";
        Error.style.gridTemplateRows = "1fr 3fr";
        //#0D0538
        Error.style.backgroundColor = "#0A0022";
        Error.style.marginBottom = "50px";

        Error.style.justifyItems = "center";
        Error.style.alignItems = "center";
        const DisplayError = document.createElement("div");
        DisplayError.className = "DisplayError";
        DisplayError.innerHTML = "Error :3";
        DisplayError.style.color = "green";
        DisplayError.style.fontSize = "60px";
        DisplayError.style.fontWeight = "bold";
        DisplayError.style.textAlign = "center";

        Error.style.marginTop = "50px";
        Error.style.marginBottom = "10px";
        Error.style.marginLeft = "20px";
        Error.style.marginRight = "20px";
        Error.style.borderRadius = "10px";
        Error.appendChild(DisplayError);
        Error.style.boxShadow = "0px 0px 10px 0px rgba(0,0,0,0.75)";



        Error.style.justifyContent = "center";
        Error.style.alignItems = "center";
        const cat3 = document.createElement("img");
        cat3.src = `https://media.discordapp.net/attachments/804328644364730429/1050341560090365992/attachment-2-3-1.gif`;
        cat3.style.width = "400px";
        cat3.style.height = "auto";
        cat3.style.borderRadius = "20px";

        Error.appendChild(cat3);


    }
}
function getSecondaryRuneIcon(secondaryRuneId) {
    switch (secondaryRuneId) {
        // Precision
        case 8000: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7201_precision.png`;
        // Domination
        case 8100: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7200_domination.png`;
        // Resolve
        case 8400: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7204_resolve.png`;
        // Sorcery
        case 8200: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7202_sorcery.png`;
        // Inspiration
        case 8300: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/7203_whimsy.png`;

    }
}

function getQueueType(queueId) {
    switch (queueId) {
        case 420: return "Ranked Solo";
        case 440: return "Ranked Flex";
        case 430: return "Normal Blind";
        case 400: return "Normal Draft";
        case 450: return "ARAM";
        case 830: return "Co-op vs. AI Intro";
        case 840: return "Co-op vs. AI Beginner";
        case 850: return "Co-op vs. AI Intermediate";
        case 900: return "URF";
        case 1020: return "One for All";
        default: return "ERROR";
    }

}
function getKeystoneRuneIcon(keystoneRuneId) {
    switch (keystoneRuneId) {
        // Lethal Tempo   V
        case 8008: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/lethaltempo/lethaltempotemp.png`;
        // Press the Attack
        case 8005: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/presstheattack/presstheattack.png`;
        // Fleet Footwork
        case 8021: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/fleetfootwork/fleetfootwork.png`;
        // Conqueror
        case 8010: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/precision/conqueror/conqueror.png`;
        // Electrocute
        case 8112: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/electrocute/electrocute.png`;
        // Predator
        case 8124: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/predator/predator.png`;
        // Dark Harvest
        case 8128: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/darkharvest/darkharvest.png`;
        // Hail of Blades
        case 9923: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/domination/hailofblades/hailofblades.png`;
        // Grasp of the Undying
        case 8437: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/graspoftheundying/graspoftheundying.png`;
        // Aftershock
        case 8439: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/veteranaftershock/veteranaftershock.png`;
        // Guardian
        case 8465: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/resolve/guardian/guardian.png`;
        // Phase Rush
        case 8230: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/phaserush/phaserush.png`;
        // Arcane Comet
        case 8229: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/arcanecomet/arcanecomet.png`;
        // Summon Aery
        case 8214: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/sorcery/summonaery/summonaery.png`;
        // Glacial Augment
        case 8351: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/glacialaugment/glacialaugment.png`;
        // Unsealed Spellbook
        case 8360: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/unsealedspellbook/unsealedspellbook.png`;
        // First Strike
        case 8369: return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/styles/inspiration/firststrike/firststrike.png`;
    }
}

function getSummonerSpellIcon(summonerIconId) {


    switch (summonerIconId) {
        case 21: summonerIconId = "Barrier"; break;
        case 1: summonerIconId = "Boost"; break;
        case 14: summonerIconId = "Dot"; break;
        case 3: summonerIconId = "Exhaust"; break;
        case 4: summonerIconId = "Flash"; break;
        case 6: summonerIconId = "Haste"; break;
        case 7: summonerIconId = "Heal"; break;
        case 13: summonerIconId = "Mana"; break;
        case 30: summonerIconId = "PoroRecall"; break;
        case 31: summonerIconId = "PoroThrow"; break;
        case 11: summonerIconId = "Smite"; break;
        case 39: summonerIconId = "Snowball"; break;
        case 32: summonerIconId = "Snowball"; break;
        case 12: summonerIconId = "Teleport"; break;
        default: summonerIconId = `${summonerIconId}`; break;
    }
    // playerSumSpell1.src = `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/Summoner${sum1}.png`;
    // playerSumSpell2.src = `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/Summoner${sum2}.png`;

    return `https://ddragon.leagueoflegends.com/cdn/13.10.1/img/spell/Summoner${summonerIconId}.png`;
}


function getChampionIcon(divToChange, championName) {
    const originalChampionName = championName.toLowerCase();
    championName = championName.toLowerCase()
    switch (championName) {
        case "orianna": championName = "oriana"; break;
        case "anivia": championName = "cryophoenix"; break;
        case "wukong": championName = "monkeyking"; break;
        case "blitzcrank": championName = "steamgolem"; break;
        case "chogath": championName = "greenterror"; break;
        case "rammus": championName = "armordillo"; break;
        case "zilean": championName = "chronokeeper"; break;
        case "shaco": championName = "jester"; break;

    }
    if (championName === "milio") {
        divToChange.src = `https://raw.communitydragon.org/latest/game/assets/characters/milio/hud/milio_circle_0.milio.png`;
    } else if (championName === "ahri") {

        divToChange.src = `https://raw.communitydragon.org/latest/game/assets/characters/ahri/hud/ahri_circle_0.skins_ahri_asu_prepro.png`
    } else if (championName === "ksante") {
        divToChange.src = `https://raw.communitydragon.org/latest/game/assets/characters/ksante/hud/ksante_circle_0.ksante.png`;
    } else if (championName === "nilah") {
        divToChange.src = `https://raw.communitydragon.org/latest/game/assets/characters/nilah/hud/nilah_circle_0.nilah.png`;
    } else if (championName === "belveth") {
        divToChange.src = `https://raw.communitydragon.org/latest/game/assets/characters/belveth/hud/belveth_circle_0.belveth.png`;
    } else if (championName === "udyr") {
        divToChange.src = `https://raw.communitydragon.org/latest/game/assets/characters/udyr/hud/udyr_circle_0.udyrvgu.png`;
    } else if (championName === "hecarim") {
        divToChange.src = `https://raw.communitydragon.org/latest/game/assets/characters/hecarim/hud/hecarim_circle_0.pie_c_13_6.png`;
    } else divToChange.src = `https://raw.communitydragon.org/latest/game/assets/characters/${originalChampionName}/hud/${championName}_circle.png`;

    divToChange.setAttribute("onerror", `this.onerror = "null"; this.src = 'https://raw.communitydragon.org/latest/game/assets/characters/${originalChampionName}/hud/${championName}_circle_0.png';`);


}

function getPlayerKP(kills, assists, totalTeamKills1, totalTeamKills2, teamID) {
    let output;
    if (teamID === 100) {
        output = `KP: ${(((kills + assists) / totalTeamKills1) * 100).toFixed(2)}% `;


    }
    else {
        output = `KP: ${(((kills + assists) / totalTeamKills2) * 100).toFixed(2)}% `;

    }

    return output;
}
