from flask import Flask, jsonify ,request
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
def get_db():
    # return mysql.connector.connect(
    #     # host="localhost",#add your host inside this ""
    #     # user="root",#add your user name
    #     # password="Saharsh@70128",#add your password
    #     # database="melofi",#create this database further instruction in Readme of task-06
    #     # autocommit=True

    # )
    return mysql.connector.connect(
    host=os.environ["MYSQLHOST"],
    user=os.environ["MYSQLUSER"],
    password=os.environ["MYSQLPASSWORD"],
    database=os.environ["MYSQLDATABASE"],
    port=int(os.environ["MYSQLPORT"])
)

CORS(app, origins=["http://localhost:5173"])


@app.route("/signup", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    password_hashed = generate_password_hash(password)
    db = get_db()
    cursor = db.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (username , password_hash) VALUES (%s, %s)",
            (username, password_hashed)
        )
        db.commit()
        return jsonify({"msg": "Registered"}), 201

    except mysql.connector.IntegrityError as e:
        print(e) 
        return jsonify({"error": "User already exists"}), 409

    finally:
        cursor.close()

@app.route("/login",methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    db=get_db()
    cursor = db.cursor()

    
    try:
        cursor.execute("SELECT password_hash FROM users where username = %s",(username,))
        result = cursor.fetchone()
        if result is None:
            return jsonify({"error":"invalid username "}),401
        else:
            if check_password_hash(result[0],password):
                return jsonify({"msg":"login successful"}),200
            else:
                return({"error":"password does not match"}),401
    except Exception as e:
        print(e) 
        return jsonify({"error": "User not found"}), 401
    
@app.route("/newplaylist",methods=["POST"])
def playlist():
    data = request.json
    currentuser = data.get("currentUser")
    playlist_name = data.get("newPlaylist")
    print(currentuser,playlist_name)
    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute(
            "INSERT IGNORE INTO playlists (username, name) VALUES (%s, %s)",
            (currentuser, playlist_name)
        )
        db.commit()
        return jsonify({"status": "playlist added"}), 200

    except mysql.connector.IntegrityError as e:
    
        return jsonify({"error": "error occured"}), 409

    finally:
        cursor.close()

@app.route("/playlistsbutton", methods=["POST"])
def get_playlists():
    data = request.json
    username = data.get("username")
    db=get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute(
        "SELECT id,name FROM playlists WHERE username = %s",
        (username,)
    )
    playlists = cursor.fetchall()
    cursor.close()

    return jsonify(playlists)

@app.route("/addtoplaylist", methods=["POST"])
def addtoplaylist():
    data = request.json
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        INSERT INTO playlist_items
        (playlist_id, track_id, track_name, artist_name, artwork_url, preview_url)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            data["playlist_id"],
            data["track_id"],
            data["track_name"],
            data["artist_name"],
            data["artwork_url"],
            data["preview_url"]
        )
    )

    db.commit()
    cursor.close()
    db.close()

    return jsonify({"msg": "song added"}), 200


@app.route("/playlistitems",methods=["POST"])
def playlist_items():
    data=request.json

    db = get_db()
    playlist_id = data["playlist_id"]
    cursor=db.cursor(dictionary=True)
    cursor.execute("SELECT track_id as trackId,track_name AS trackName ,artist_name AS artistName,artwork_url AS artworkUrl100,preview_url AS previewUrl FROM playlist_items WHERE playlist_id = %s",(playlist_id,))
    results = cursor.fetchall()
    cursor.close()
    db.close()

    return jsonify({"results":results}),200


@app.route("/playlistitemsdelete",methods=["POST"])
def delete_playlist_items():
    data = request.json

    db = get_db()
    track_id = data["trackId"]
    playlistId = data["playlistId"]
    cursor = db.cursor(dictionary=True)
    cursor.execute("DELETE FROM playlist_items WHERE track_id =%s  and playlist_id = %s",(track_id,playlistId,))
    cursor.close()
    db.close()

    return jsonify({"msg":"song deleted"}),200

@app.route("/addtorecentlyplayed", methods=["POST"])
def addtorecently():
    data = request.json
    print(data)
    db = get_db()
    cursor = db.cursor()

    cursor.execute(
        """
        INSERT INTO recentlyplayed_items
        ( track_id, track_name, artist_name, artwork_url, preview_url,username)
        VALUES (%s, %s, %s, %s, %s, %s)
        """,
        (
            data["track_id"],
            data["track_name"],
            data["artist_name"],
            data["artwork_url"],
            data["preview_url"],
            data["username"]
        )
    )

    db.commit()
    cursor.close()
    db.close()

    return jsonify({"msg": "song added"}), 200


@app.route("/recentlyplayed",methods=["POST"])
def fetchrecentlyplayed():
    data=request.json

    db = get_db()
    username = data["username"]
    cursor=db.cursor(dictionary=True)
    cursor.execute("SELECT track_id as trackId,track_name AS trackName ,artist_name AS artistName,artwork_url AS artworkUrl100,preview_url AS previewUrl FROM recentlyplayed_items WHERE username = %s order by added_at desc",(username,))
    results = cursor.fetchall()
    cursor.close()
    db.close()

    return jsonify({"results":results}),200




if __name__ == "__main__":
    app.run(port=5000, debug=True)

