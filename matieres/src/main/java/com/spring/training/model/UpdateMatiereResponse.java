//
// This file was generated by the Eclipse Implementation of JAXB, v3.0.0 
// See https://eclipse-ee4j.github.io/jaxb-ri 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2025.01.04 at 10:28:41 AM UTC 
//


package com.spring.training.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlType;


/**
 * <p>Java class for anonymous complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element name="matiere" type="{http://spring.com/training/model}Matiere"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
    "matiere"
})
@XmlRootElement(name = "updateMatiereResponse")
public class UpdateMatiereResponse {

    @XmlElement(required = true)
    protected Matiere matiere;

    /**
     * Gets the value of the matiere property.
     * 
     * @return
     *     possible object is
     *     {@link Matiere }
     *     
     */
    public Matiere getMatiere() {
        return matiere;
    }

    /**
     * Sets the value of the matiere property.
     * 
     * @param value
     *     allowed object is
     *     {@link Matiere }
     *     
     */
    public void setMatiere(Matiere value) {
        this.matiere = value;
    }

}
