const fileContents: Record<string, string> = {
  // run.py
  "run.py": `from api import app, mongo
  from api.models.book_model import Book
  from api.services import book_service
  
  if __name__ == "__main__":
      with app.app_context():
          if 'books' not in mongo.db.list_collection_names():
              book = Book(
                  title="",
                  description="",
                  genre=""
              )
              book_service.add_book(book)
      app.run(debug=True)
  `,

  // api/__init__.py
  "api/__init__.py": `from flask import Flask
    from flask_restful import Api
    from flask_pymongo import PyMongo
    from flask_marshmallow import Marshmallow
    
    app = Flask(__name__)
    
    app.config["MONGO_URI"] = 'mongodb://localhost:27017/apibooks'
    
    api = Api(app)
    mongo = PyMongo(app)
    ma = Marshmallow(app)
    
    from .resources import book_resources
    `,

  // api/models/book_model.py
  "api/models/book_model.py": `from api import mongo

    class Book():
        def __init__(self, title, description, genre):
            self.title = title
            self.description = description
            self.genre = genre
    `,

  // api/resources/book_resources.py
  "api/resources/book_resources.py": `from flask_restful import Resource
    from api import api
    from flask import make_response, jsonify, request
    from ..schemas import book_schema
    from ..models import book_model
    from ..services import book_service
    
    class BookList(Resource):
        def get(self):
            books = book_service.get_books()
            bk = book_schema.BookSchema(many=True)
            return make_response(bk.jsonify(books), 200)
    
        def post(self):
            bk = book_schema.BookSchema()
            validate = bk.validate(request.json)
            if validate:
                return make_response(jsonify(validate), 400)
            else:
                title = request.json["title"]
                description = request.json["description"]
                genre = request.json["genre"]
    
                new_book = book_model.Book(
                    title=title, description=description, genre=genre)
                result = book_service.add_book(new_book)
                res = bk.jsonify(result)
                return make_response(res, 201)
    
    class BookDetail(Resource):
        def get(self, id):
            book = book_service.get_book_by_id(id)
            if book is None:
                return make_response(jsonify("Not found"), 404)
            bk = book_schema.BookSchema()
            return make_response(bk.jsonify(book), 200)
    
        def put(self, id):
            book_bd = book_service.get_book_by_id(id)
            if book_bd is None:
                return make_response(jsonify("Not found"), 404)
            bk = book_schema.BookSchema()
            validate = bk.validate(request.json)
            if validate:
                return make_response(jsonify(validate), 404)
            else:
                title = request.json["title"]
                description = request.json["description"]
                genre = request.json["genre"]
                new_book = book_model.Book(
                    title=title, description=description, genre=genre)
                book_service.update_book(new_book, id)
                updated_book = book_service.get_book_by_id(id)
                return make_response(bk.jsonify(updated_book), 200)
    
        def delete(self, id):
            book_bd = book_service.get_book_by_id(id)
            if book_bd is None:
                return make_response(jsonify("Livro não encontrado."), 404)
            book_service.delete_book(id)
            return make_response(jsonify("Livro excluído com sucesso!"), 204)
     
    api.add_resource(BookList, '/books')
    api.add_resource(BookDetail, '/books/<id>')
    `,

  // api/schemas/book_schema.py
  "api/schemas/book_schema.py": `from api import ma
    from marshmallow import Schema, fields
    
    class BookSchema(ma.Schema):
        _id = fields.Str()
        title = fields.Str(required=True)
        description = fields.Str(required=True)
        genre = fields.Str(required=True)
    `,

  // api/services/book_service.py
  "api/services/book_service.py": `from api import mongo
    from ..models import book_model
    from bson import ObjectId
    
    def add_book(movie):
        mongo.db.books.insert_one({
            'title': movie.title,
            'description': movie.description,
            'genre': movie.genre
        })
    
    @staticmethod
    def get_books():
        return list(mongo.db.books.find())
    
    @staticmethod
    def get_book_by_id(id):
        return mongo.db.books.find_one({'_id': ObjectId(id)})
    
    def update_book(self, id):
        mongo.db.books.update_one({'_id': ObjectId(id)},
                                  {'$set':
                                   {
                                       'title': self.title,
                                       'description': self.description,
                                       'genre': self.genre
                                   }
                                   })
    
    @staticmethod
    def delete_book(id):
        mongo.db.books.delete_one({'_id': ObjectId(id)})
    `,
};

export default fileContents;
