# fullstack-typescript

 yarn add -D @type/node typescript ts-node nodemon
 npx tsconfig.json


# Link tham khao: https://www.rasikag.com/posts/creating-a-reddit-clone-using-react-and-graphql-02
# https://www.youtube.com/watch?v=1UMNUbtzQXk&t=1354s

# https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04

# https://www.pgadmin.org/download/pgadmin-4-apt/

# https://www.postgresql.org/download/linux/ubuntu/

# Chu y co the phai check xem port dang chay tren nginx hay ko, tat ngĩn chuyen sang start apache2

# yarn add pg

# yarn add express graphql apollo-server-core apollo-server-express type-graphql class-validator reflect-metadata

# yarn add dotenv

# yarn add -D @types/express typeorm

===================
# Cai dat postgreSQL


===================

# https://phoenixnap.com/kb/how-to-install-postgresql-on-ubuntu
# https://www.tecmint.com/install-postgresql-and-pgadmin-in-ubuntu/

# ssl: https://computingforgeeks.com/enable-ssl-encryption-password-authentication-postgresql/
# Master password: 1

# error:
 # khi cai dat: "postgres could not initiate gssapi security context" => loi nay doi password nhu ben duoi
 # error sasl scram-server-first-message client password must be a string: loiu nay do file env khong doc duoc dien truc tiep hoac xem lai

# postgreSQL khi tao se co 1 role mac dinh la postgres ko biet dc password
# ta phai chuyen sang tai khoan để đổi password cho role postgres: sudo -i -u postgres
# psql postgres postgres => login sang tai khoan postgres va thuc hien doi password bang cau lenh sau
# \password postgres  trong do postgres la ten cua role
# nhap password sau do quay ve pgadmin 4 tao 1 database moi, link doi password: https://enterprise.arcgis.com/en/server/10.3/cloud/amazon/change-default-database-passwords-on-linux.htm


# yarn add argon2

# Thuong de giu lai login luu sesssion cookie va dung voi resis cache - bai nay dung mongodb

# db: reddit/DMJ6JB6ZgFWY4xiw

# yarn add express-session connect-mongo
# yarn add -D @types/express-session

# install typegoose itself
# yarn add @typegoose/typegoose 

# install peer-dependency mongoose
# yarn add mongoose 

# Shift + Alt + O: DE OPTIMIZE IMPORT

1 - khi gán req.session.userId = existingUser.id

sẽ tạo 1 object kiểu {userId: 1 }

2 - express session va connect-mongo tao 1 ban luu trong mongodb

{"cookie":
{"originalMaxAge":60000,"expires":"2022-06-19T11:17:33.356Z","secure":false,"httpOnly":true,"path":"/","sameSite":"none"},
"userId":16
}

# 3. express session dong thoi luu cookie ở client browser
# với tên và mã hóa value reddit-cookie: 3ththdhdghsfafggsdgssdgsgsdg

# 4. Khi user make request tới server cookie sẽ đc gửi theo

# 5. server sẽ decrypt cookie và sẽ tìm ra được session id
# _id: "DIhWo8Sm1-1Zckol5opDUGaEPtEHlc7h"

# 6. Khi đó session store make request tới mongo db
# find(_id: "DIhWo8Sm1-1Zckol5opDUGaEPtEHlc7h")

# lấy ra đc userId: 1

# 7. Server gắn userId = 1 vào red.session

# 8. Khi đó muốn biết user nào đang gửi request chỉ cần get
# req.session.userId

# ví dụ muốn tìm cac bài post đc tạo bởi userId
# Post.find(userId: req.session.userId)


====================
# Frontend
=========================

# https://github.com/vercel/next.js/tree/canary/examples
# https://github.com/vercel/next.js/tree/canary/examples/with-chakra-ui

# yarn create next-app --example with-chakra-ui client