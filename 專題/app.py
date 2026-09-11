from flask import Flask, render_template, request
from configparser import ConfigParser
import os
import pandas as pd

# 1. 只載入新版的 SDK，舊的 google.generativeai 已經全部刪除
from google import genai 

# --- 雲端與本機雙棲的金鑰讀取法 ---
api_key = os.environ.get("GEMINI_API_KEY") # 先嘗試找雲端的金鑰

if not api_key: # 如果找不到 (代表你現在是在自己的電腦上開發)
    config = ConfigParser()
    config.read("config.ini")
    api_key = config["Gemini"]["API_KEY"]

client = genai.Client(api_key=api_key)

app = Flask(__name__)

@app.route('/')
def formPage():
    # 你的首頁資料處理邏輯完全保持不變
    df = pd.read_csv(
        "https://raw.githubusercontent.com/circleaa/circleaa/main/DailyForeignExchangeRates%20.csv",
        encoding="cp950",
    )
    dff = pd.read_csv(
        "https://raw.githubusercontent.com/circleaa/circleaa/main/DailyForeignExchangeRates%20.csv",
        encoding="cp950",
    )
    df.drop(df.iloc[:, 2:], axis=1, inplace=True)
    df.columns = ["date", "in"]
    df['date'] = pd.to_datetime(df['date'], format='%Y%m%d')
    df['date'] = df["date"].astype(str)

    dff.drop(dff.iloc[:, 3:], axis=1, inplace=True)
    dff.drop(dff.iloc[:, 1:2], axis=1, inplace=True)
    dff.columns = ["date", "out"]
    dff['date'] = pd.to_datetime(dff['date'], format='%Y%m%d')
    dff['date'] = dff["date"].astype(str)

    result = df.to_json(orient="records")
    resultt = dff.to_json(orient="records")
    return render_template("index.html", exchangeData=result, exchangeDataa=resultt)

@app.route("/call_llm", methods=["POST"])
def call_llm():
    if request.method == "POST":
        print("POST! 呼叫八卦")
        try:
            # 統一使用新版寫法與 gemini-2.5-flash 模型
            response = client.models.generate_content(
                model='gemini-3.6-flash', 
                contents='用一句話講一個關於職場上的八卦。注意：只能輸出這一句話，絕對不要提供選項，也不要有任何開場白、解釋或標點符號之外的符號。'
            )
            return response.text
        except Exception as e:
            return "其實我喜歡妳"

@app.route("/call_llmm", methods=["POST"])
def call_llmm():
    if request.method == "POST":
        print("POST! 呼叫離職恭喜")
        try:
            response = client.models.generate_content(
                model='gemini-3.6-flash',
                contents='用一句話恭喜她逃離公司。注意：只能輸出這一句話，絕對不要提供選項，也不要有任何開場白、解釋或標點符號之外的符號。'
            )
            return response.text
        except Exception as e:
            return "恭喜逃離公司"

@app.route("/call_llmmm", methods=["POST"])
def call_llmmm():
    if request.method == "POST":
        print("POST! 呼叫催促工作")
        try:
            response = client.models.generate_content(
                model='gemini-3.6-flash',
                contents='用一句話內催促他去工作。注意：只能輸出這一句話，絕對不要提供選項，也不要有任何開場白、解釋或標點符號之外的符號。'
            )
            return response.text
        except Exception as e:
            return "知不知道現在幾點了啊，工作做完了沒"

if __name__ == '__main__':
    # 加上 debug=True 方便你後續開發
    app.run(debug=True)