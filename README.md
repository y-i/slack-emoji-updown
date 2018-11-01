# slack-emoji-updown
slackの絵文字をdownloadしたりuploadしたりする

## 機能
- `emoji-save.js`
    - emoji全てをディレクトリ以下に保存
- `emoji-add.js` 
    - ディレクトリ以下のemoji全てをworkspaceに追加
- `sync.sh`
    - `DOWNLOAD_SLACK_TOKEN`のTOKENで取得したemojiを`UPLOAD_TOKEN`で指定したTOKENのworkspaceへ追加する

## 設定
- `.env.example`を`.env`にコピーして環境変数を設定する
- `npm install` or `yarn install`

## 環境変数
- `DOWNLOAD_SLACK_TOKEN`
    - emojiを取ってきたいworkspaceの`emoji.list`を叩けるtoken (legacy tokenなど)
- `UPLOAD_TOKEN`
    - emojiを追加したいworkspaceの`emoji.add`などを叩けるtoken (emoji追加のウェブページ(https://\<workspace名\>.slack.com/customize/emoji)で試用されてる`xoxs-`から始まるtoken)
- `DIRNAME`
    - emojiの画像を保存するディレクトリ
    - 存在しない場合は作成する
