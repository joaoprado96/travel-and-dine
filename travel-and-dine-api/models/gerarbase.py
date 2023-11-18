import random
import string
from dado import *
from pymongo import MongoClient

# Função para gerar string aleatória
def gerar_string_aleatoria(tamanho):
    letras = string.ascii_letters
    return ''.join(random.choice(letras) for i in range(tamanho))

def gerar_nome_restaurante():
    adjetivos = ['Encantado', 'Mágico', 'Delicioso', 'Saboroso', 'Aconchegante', 'Tradicional']
    tipos = ['Bistrô', 'Café', 'Restaurante', 'Bar', 'Cantina', 'Trattoria']
    temas = ['Marítimo', 'da Praia', 'do Vale', 'da Montanha', 'do Jardim', 'dos Vinhos']
    return random.choice(adjetivos) + ' ' + random.choice(temas) + ' ' + random.choice(tipos)

def gerar_endereco_aleatorio():
    tipos = ['Rua', 'Avenida', 'Travessa', 'Praça', 'Alameda', 'Vila']
    nomes = ['das Flores', 'do Sol', 'dos Passaros', 'da Paz', 'dos Jardins', 'dos Pinheiros', 'do Porto', 'da Fonte']
    complementos = ['Apto. 101', 'Casa', 'Bloco 2', 'Fundos', 'Lote 7', 'Sala 301']
    numero = random.randint(1, 2000)
    return random.choice(tipos) + ' ' + random.choice(nomes) + ', ' + str(numero) + ', ' + random.choice(complementos)

def gerar_instagram_aleatorio():
    prefixos = ['viajante', 'gourmet', 'explorador', 'aventureiro', 'estiloso', 'fotografo', 'chef', 'foodie']
    sufixos = ['oficial', 'br', 'real', 'top', 'vip', 'pro']
    numero = random.randint(100, 999)
    return '@' + random.choice(prefixos) + str(numero) + random.choice(sufixos)


# Função para gerar dados aleatórios
def gerar_dados_aleatorios():
    dados = {
        "nome": gerar_nome_restaurante(),
        "endereco": gerar_endereco_aleatorio(),
        "telefone": f'+55 {random.randint(1000000000, 9999999999)}',
        "instagram":  gerar_instagram_aleatorio(),
        "culinaria": random.sample(CONFIG['culinaria'], random.randint(1, len(CONFIG['culinaria']))),
        "precos": random.choice(CONFIG['precos']),
        "avaliacao": random.choice(CONFIG['avaliacao']),
        "tema": random.sample(CONFIG['tema'], random.randint(1, len(CONFIG['tema']))),
        "cartao": random.sample(CONFIG['cartao'], random.randint(1, len(CONFIG['cartao']))),
        "dias": random.sample(CONFIG['dias'], random.randint(1, len(CONFIG['dias']))),
        "horario": random.sample(CONFIG['horario'], random.randint(1, len(CONFIG['horario']))),
        "caminhoFoto": random.sample(CONFIG['caminhoFoto'], random.randint(1, len(CONFIG['caminhoFoto'])))
    }
    return dados

# Conectar ao MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['travelanddine']
colecao = db['restaurantmodels']

# Gerar e inserir dados
for _ in range(100):  # Gerar 10 registros
    registro = gerar_dados_aleatorios()
    colecao.insert_one(registro)

print('Dados inseridos com sucesso!')
