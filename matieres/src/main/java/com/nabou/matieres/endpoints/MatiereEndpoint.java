package com.nabou.matieres.endpoints;

import com.example.matieres.GetMatiereRequest;
import com.example.matieres.GetMatiereResponse;
import com.nabou.matieres.entities.Matiere;
import com.nabou.matieres.repositories.MatiereRepository;
import org.springframework.ws.server.endpoint.annotation.Endpoint;
import org.springframework.ws.server.endpoint.annotation.PayloadRoot;
import org.springframework.ws.server.endpoint.annotation.RequestPayload;
import org.springframework.ws.server.endpoint.annotation.ResponsePayload;

@Endpoint
public class MatiereEndpoint {

    private static final String NAMESPACE_URI = "http://example.com/matieres";
    private final MatiereRepository matiereRepository;

    public MatiereEndpoint(MatiereRepository matiereRepository) {
        this.matiereRepository = matiereRepository;
    }

    @PayloadRoot(namespace = NAMESPACE_URI, localPart = "getMatiereRequest")
    @ResponsePayload
    public GetMatiereResponse getMatiere(@RequestPayload GetMatiereRequest request) {
        Matiere matiereEntity = matiereRepository.findById(request.getId())
                .orElseThrow(() -> new RuntimeException("Matiere not found"));

        GetMatiereResponse response = new GetMatiereResponse();
        response.setMatiere(mapToSoapMatiere(matiereEntity)); // Conversion ici
        return response;
    }

    private com.example.matieres.Matiere mapToSoapMatiere(Matiere matiereEntity) {
        com.example.matieres.Matiere soapMatiere = new com.example.matieres.Matiere();
        soapMatiere.setId(matiereEntity.getId());
        soapMatiere.setNom(matiereEntity.getName());
        soapMatiere.setCoefficient(matiereEntity.getCoefficient());
        return soapMatiere;
    }
}
