# cc-api-solo "Memooo"

## 概要

- This Project is my first solo project.
- Web上でメモを取る事ができるサンプルプロジェクトです。
- REST apiを利用し、メモの作成・参照・変更・削除を行えます。

## インストール方法

### セットアップ

- 以下、ターミナルでコマンド実行します。
  - npm i
  - npm run migration
  - npm run seed
  - npm run start

### 利用方法

- ブラウザから以下URLにアクセスすることで現在のメモ一覧を確認することができます。
  - http://localhost:3000/
- メモの追加・変更・削除はPOSTMANを利用します。以下、利用可能なAPIの一覧です。

#### GET （メモの取得）

```
// リクエスト
GET http://localhost:3000/api/memos/

// レスポンス
[
    {
        "id": 68,
        "memo": "memoTest",
        "create_date": "2024-02-05T15:00:00.000Z",
        "update_date": "2024-02-05T15:00:00.000Z"
    },
    {
        "id": 69,
        "memo": "memo999",
        "create_date": "2024-02-05T15:00:00.000Z",
        "update_date": "2024-02-05T15:00:00.000Z"
    }
]
```

#### POST （メモの作成）

```
// リクエスト
POST http://localhost:3000/api/memos/
// リクエストボディ
{
    "memo": "memoTest",
    "create_date": "2024-02-05T15:00:00.000Z"
}

// レスポンス
{
    "id": 117 //作成したメモのid
}
```

#### PATCH （メモの取得）

```
// リクエスト
PATCH http://localhost:3000/api/memos/:memo_id
// リクエストボディ
{
    "memo": "memoTest",
    "update_date": "2024-02-05T15:00:00.000Z"
}

// レスポンス
{
    "id": 117
}
```

#### DELETE （メモの削除）

```
// リクエスト
DELETE http://localhost:3000/api/memos/:memo_id

// レスポンス
{
    "id": 117
}
```
