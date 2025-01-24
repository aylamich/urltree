import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";


actor {

  type UrlTree = {
    // adiciona aqui tbm o campo de nome eme todos os parametros
    id: Nat; // Identificador único da URL
    principal: Text;
    nomeUrl: Text; // Nome do url              
    linkLinkedin: Text; // Link URL
    linkGithub: Text;   // Link URL
    linkInstagram: Text; // Link URL
    linkDiscord: Text; // Link URL  
    
  };

  let urls = HashMap.HashMap<Text, Nat>(0, Text.equal, Text.hash); // Let, não pode ser alterado, começa com 0 itens esse hashmap vazio
  let idsUrl = HashMap.HashMap<Nat, UrlTree>(0, Nat.equal, Hash.hash);
  
  var idUrl : Nat = 0; 

  public shared (msg) func adicionarUrlTree( nomeUrl: Text, linkLinkedin: Text, linkGithub: Text, linkInstagram: Text, linkDiscord: Text ) : async Nat {

     // idUrl := idUrl + 1; 

    let p : Text = Principal.toText(msg.caller);

      // Verifica se o Principal já tem uma URL cadastrada
    let existingId : ?Nat = urls.get(p);
    switch (existingId) {
        case (?ex) {
            // O Principal já existe
            return 0;
        };
        case (null) {
            // O Principal não existe, podemos prosseguir
            idUrl := idUrl + 1;

            let url : UrlTree = {     id = idUrl;
                                      principal = p;
                                      nomeUrl = nomeUrl;
                                      linkLinkedin = linkLinkedin;
                                      linkGithub = linkGithub;
                                      linkInstagram = linkInstagram;
                                      linkDiscord = linkDiscord
                                };

            urls.put(p, idUrl);
            idsUrl.put(idUrl, url);

            return idUrl // a ia do icp disse pra por um ? antes do idUrl
        };
    };
  };

  public shared (msg) func retornarUrlTree() : async UrlTree {

    let p : Text = Principal.toText(msg.caller); //mesmo la de cima

    let idUrl : ?Nat = urls.get(p); // get as url

    switch (idUrl) {
      case (null) {
         let u : UrlTree = {id = 0; principal = ""; nomeUrl = ""; linkLinkedin = ""; linkGithub = ""; linkInstagram = ""; linkDiscord = "" };
        return u; 
      };

      case (?u) {
          let url : ?UrlTree = idsUrl.get(u);
          switch (url) {
            case (null) {
              let u : UrlTree = {id = 0; principal = ""; nomeUrl = ""; linkLinkedin = ""; linkGithub = ""; linkInstagram = ""; linkDiscord = "" };
              return u; 
            };  
            case (?ur) {
              return ur; 
            };
          }           
      };
    }

    //let uu : UrlTree = {principal = ""; nomeUrl = ""; linkLinkedin = ""; linkGithub = ""; linkInstagram = ""; linkDiscord = "" };
    //return uu;
  };

  public shared (msg) func retornarUrlTreePorId(id : Nat) : async UrlTree {

    let url = idsUrl.get(id); // get as url

    switch (url) {
      case (null) {
         let u : UrlTree = {id = 0; principal = ""; nomeUrl = ""; linkLinkedin = ""; linkGithub = ""; linkInstagram = ""; linkDiscord = "" };
        return u; 
      };

      case (?u) {
        return u; 
      };
    }
  };
 
 // fazer a funcao editar é parecida com o retornar links por id mas coloca um replace

 public shared(msg) func editarUrlTree(id : Nat, nomeUrl: Text, linkLinkedin: Text, linkGithub: Text, linkInstagram: Text, linkDiscord: Text) : async ?UrlTree {
    let userPrincipal = msg.caller;

    switch (idsUrl.get(id)) {
        case (null) {
            // URL não encontrada
            return null;
        };
        case (?urlExistente) {
            // Verifica se o usuário é o proprietário da URL
            if (urlExistente.principal != Principal.toText(userPrincipal)) {
                return null; // Usuário não autorizado
            };

            // Cria uma nova UrlTree mantendo o principal original
            let urlAtualizada : UrlTree = {
                id = urlExistente.id;
                principal = urlExistente.principal; // Mantém o principal original
                nomeUrl = nomeUrl;
                linkLinkedin = linkLinkedin;
                linkGithub = linkGithub;
                linkInstagram = linkInstagram;
                linkDiscord = linkDiscord;
            };

            // Atualiza o mapa usando replace
            let resultado = idsUrl.replace(id, urlAtualizada);
            
            return ?urlAtualizada;
        };
    };
};
  
};
