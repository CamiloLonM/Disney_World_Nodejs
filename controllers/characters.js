const service = require("../services/characters");

// Punto 3
const getCharacters = async (req, res) => {
  try {
    const characters = await service.getCharacters();

    return res.status(200).json(characters);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// punto 5
const getCharacterById = async (req, res) => {
  try {
    const character = await service.getCharacterById(req.params.id);

    if (!character) {
      return res.sendStatus(204);
    }

    return res.status(200).json(character);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// PUNTO 6 QUERY PARAMS
const searchCharacter = async (req, res) => {
  try {
    const { query } = req;

    const characters = await service.searchCharacters(query);

    return res.status(200).json(characters);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const postCharacter = async (req, res) => {
  try {
    if (!req.body.name || !req.file) {
      return res.status(400).json({ message: `please check the data` });
    }

    const character = await service.postCharacter(req.body, req.file.filename);
    return res.status(201).json(character);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const putCharacter = async (req, res) => {
  // 4
  try {
    if (!req.body.name || !req.file) {
      return res.status(400).json({ message: `please check the data` });
    }

    if (!service.getCharacterById(req.params.id)) {
      return res.status(404).json({ message: "Character not found." });
    }

    await service.putCharacter(req.params.id, req.body, req.file.filename);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    if (!service.getCharacterById(req.params.id)) {
      return res.status(404).json({ message: "Character not found." });
    }

    await service.deleteCharacter(req.params.id);

    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCharacters,
  getCharacterById,
  searchCharacter,
  postCharacter,
  putCharacter,
  deleteCharacter,
};
