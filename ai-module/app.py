from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)


def risk_level(score: float) -> str:
    if score >= 70:
        return "High"
    if score >= 40:
        return "Medium"
    return "Low"


@app.post('/predict')
def predict():
    payload = request.get_json(silent=True) or {}
    events = payload.get('events', [])

    if len(events) == 0:
        return jsonify({"score": 10, "level": "Low", "message": "No events provided"})

    magnitudes = np.array([e.get('magnitude', 0) for e in events], dtype=float)
    depths = np.array([e.get('depth', 0) for e in events], dtype=float)

    # Demo-only scoring formula.
    score = float(np.clip(np.mean(magnitudes) * 12 + np.sum(magnitudes >= 4.5) * 5 - np.mean(depths) * 0.05, 0, 100))

    return jsonify({
        "score": round(score, 2),
        "level": risk_level(score),
        "message": "Calculated using a lightweight demo model"
    })


if __name__ == '__main__':
    app.run(port=8001, debug=True)
