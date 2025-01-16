import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Principal "mo:base/Principal";


actor {

  type UrlTree = {
    // adiciona aqui tbm o campo de nome eme todos os parametros
    principal: Text;
    nomeUrl: Text; // Nome do url              
    linkLinkedin: Text; // Link URL
    linkGithub: Text;   // Link URL
    linkInstagram: Text; // Link URL
    linkDiscord: Text; // Link URL  
    
  };

  let urls = HashMap.HashMap<Text, UrlTree>(0, Text.equal, Text.hash); // Let, não pode ser alterado, começa com 0 itens esse hashmap vazio

  public shared (msg) func adicionarUrlTree( nomeUrl: Text, linkLinkedin: Text, linkGithub: Text, linkInstagram: Text, linkDiscord: Text ) : async () {

      let p : Text = Principal.toText(msg.caller);

      let url : UrlTree = {principal = p; nomeUrl = nomeUrl; linkLinkedin = linkLinkedin; linkGithub = linkGithub; linkInstagram = linkInstagram; linkDiscord = linkDiscord };

      urls.put(p, url);
  };

  public shared (msg) func retornarUrlTree() : async UrlTree {

    let p : Text = Principal.toText(msg.caller); //mesmo la de cima

    let url = urls.get(p); // get as url

    switch (url) {
      case (null) {
         let u : UrlTree = {principal = ""; nomeUrl = ""; linkLinkedin = ""; linkGithub = ""; linkInstagram = ""; linkDiscord = "" };
        return u; 
      };

      case (?u) {
        return u; 
      };
    }
  };

  
};
